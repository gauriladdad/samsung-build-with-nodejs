var fs = require("fs");
var parser = require('xmldom').DOMParser;
var xmlbuilder = require('xmlBuilder');
var filePath = "";
var fileSizeInBytes=0;
var ipAddress;
var zipFileName;


exports.processWidgetXML = function(destinationPath, xmlName, zipName, IPaddress)
{
	filePath = destinationPath + "/" + xmlName;	
	ipAddress = IPaddress;
	zipFileName = zipName;
	
	try 
	{
		console.log("fileSizeInBytes:::" + stats["size"]); */
		var path = destinationPath + "/" + zipName + ".zip";
		console.log("zip file location: " + path);
		fs.stat(path, function(err,stats) 
		{
			if(err) 
			{
				console.log("The packaging process has been aborted");
				return ;
			}
		
			fileSizeInBytes = stats["size"];
			
			fs.exists(filePath, function(exists)
			{
				exists ? readFile() : createFile();
			});
		});
  
		
	} 
	catch (e) 
	{
		console.log("The packaging process has been aborted due to an error while processing widgetlist.xml");
	}
 
	
}

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
					download: (ipAddress + "/" + zipFileName + ".zip")
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
    fs.readFile(filePath, 'utf8', function read(err, data) 
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
	fs.writeFile(filePath, xmlDoc, function (err) {
			if (err) 
				throw err;
			console.log('The widgetlist.xml file has been saved!');
		}
	);
}