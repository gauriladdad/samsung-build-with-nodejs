var fs = require('fs');
var archiver = require('archiver');
var zipArchive = archiver('zip');

exports.createZIP = function(srcDirectory, zipFileLocation, zipName)
{
	var output = fs.createWriteStream(zipFileLocation + "/" + zipName + ".zip");
	
	output.on('close', function() {
		console.log('done with the zip');
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

