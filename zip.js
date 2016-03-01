var fs = require('fs');
var archiver = require('archiver');
var zipArchive = archiver('zip');
var processXML = require("./updateWidget.js");
var buildModel = require('./buildModel.js');

exports.createZIP = function()
{
	var output = fs.createWriteStream(buildModel.getZipFullPath());
	
	output.on('error', function (err) {
		console.log("The packaging process aborted due to an error with zip file creation");
	});
	
	output.on('close', function() {
		console.log('The zip file ' + buildModel.getZipFullPath() + " has been created!");
		processXML.processWidgetXML();		
	});

	zipArchive.pipe(output);

	zipArchive.bulk([
		{ src: [ '**/*' ], cwd: buildModel.getSourceFolder(), expand: true }
	]);

	zipArchive.finalize(function(err, bytes) {

		if(err) {
		  throw new Error("Error with archiving zip");
		}

		console.log('done:', base, bytes);
	});
}

