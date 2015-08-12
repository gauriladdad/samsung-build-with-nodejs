var fs = require("fs");
var parser = require('xmldom').DOMParser;
var xmlbuilder = require('xmlBuilder');

var fileName = process.env.npm_package_config_destinationPath + "/" + "widgetlist.xml";

var stats = fs.statSync(process.env.npm_package_config_destinationPath + "/" + process.env.npm_package_config_zipName + ".zip");
var fileSizeInBytes = stats["size"];
 
fs.exists(fileName, function(exists)
{
	exists ? readFile() : createFile();
});

function createFile()
{
	var obj = {
		list: {
			widget: {
				'@id': "VideoLoad1",
				title: "Videoload",
				description: "video load application",
				compression: {
					'@size' : fileSizeInBytes,
					'@type' : "zip"
				},
				download: 
				function() {
				  return "http://" + process.env.npm_package_config_IPaddress + "/" + process.env.npm_package_config_zipName + ".zip";
				}
			}
		}	
	};

	var root = xmlbuilder.create('rsp', {version: '1.0', encoding: 'UTF-8'});
	root.att('stat', 'OK');
	var ele = root.ele(obj);
	var xmlString = root.end({ pretty: true, indent: '  ', newline: '\n' });
	write(xmlString); 
}

function readFile() 
{
    fs.readFile(fileName, 'utf8', function read(err, data) 
	{
		if(err) 
			return;
		 
		var xmlDoc = new parser().parseFromString(data);
		modifyWidget(xmlDoc);
		write(xmlDoc); 
	});
}

function modifyWidget(xmlDoc)
{
	var widgetNodes = xmlDoc.getElementsByTagName("widget");
	var widgetNode;
	for (i = 0; i < widgetNodes.length; i++)
	{
		widgetNode = widgetNodes[i];
		updateId(widgetNode);
	}
}

function updateId(widgetNode)
{
	var widgetId = widgetNode.getAttribute("id");
		
	var res = widgetId.match(/[0-9]+$/);
	var itemIndex = 1;
	if(res != null)
	{
		itemIndex = parseInt(widgetId.substr(res.index, widgetId.length));
		widgetId = widgetId.substr(0, res.index) + (itemIndex + 1);
	}
	else
	{
		widgetId = widgetId + itemIndex;
	}
	widgetNode.setAttribute("id", widgetId);
}

function write(xmlDoc)
{
	//Asynchronously writes data to a file, replacing the file if it already exists. 
	fs.writeFile(fileName, xmlDoc, function (err) {
			if (err) 
				throw err;
			console.log('It\'s saved!');
		}
	);
}