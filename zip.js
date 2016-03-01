var fs = require('fs');
var archiver = require('archiver');
var zipArchive = archiver('zip');
var processXML = require("./updateWidget.js");

exports.createZIP = function(srcDirectory, destinationPath, zipName, IPaddress)
{
	var output = fs.createWriteStream(destinationPath + "/" + zipName + ".zip");
	
	output.on('error', function (err) {
		console.log("The packaging process aborted due to an error with zip file creation");
	});
	
	output.on('close', function() {
		console.log('The zip file ' + destinationPath + "/" + zipName + ".zip has been created!");
		processXML.processWidgetXML(destinationPath, "widgetlist.xml", zipName, IPaddress);		
	});

	zipArchive.pipe(output);

	zipArchive.bulk([
		{ src: [ '**/*' ], cwd: srcDirectory, expand: true }
	]);

	zipArchive.finalize(function(err, bytes) {

		if(err) {
		  throw new Error("Error with archiving zip");
		}

		console.log('done:', base, bytes);
	});
}

