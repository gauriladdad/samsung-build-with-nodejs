var fs = require('fs');
var archiver = require('archiver');
var zipArchive = archiver('zip');

exports.createZIP = function(srcDirectory, zipFileLocation, zipName)
{
	var output = fs.createWriteStream(zipFileLocation + "/" + zipName + ".zip");
	
	output.on('error', function (err) {
		console.log("The packaging process has been aborted due to an error with zip file creation");
	});
	
	output.on('close', function() {
		console.log('The zip file ' + zipFileLocation + "/" + zipName + ".zip has been created!");
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

	})
}

