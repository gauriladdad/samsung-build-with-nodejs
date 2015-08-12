var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream(process.env.npm_package_config_destinationPath + "/" + process.env.npm_package_config_zipName + ".zip");
var zipArchive = archiver('zip');

output.on('close', function() {
    console.log('done with the zip');
});

zipArchive.pipe(output);

zipArchive.bulk([
    { src: [ '**/*' ], cwd: process.env.npm_package_config_sourceDir, expand: true }
]);

zipArchive.finalize(function(err, bytes) {

    if(err) {
      throw new Error("Error with archiving zip");
    }

    console.log('done:', base, bytes);

})