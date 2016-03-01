var readlineSync = require('readline-sync');
var jsonfile = require('jsonfile');
var buildModel = require('./buildModel.js');

exports.getUserInputs = function(callBack)
{
	console.log("Please make sure you are in the folder one level above build directory");
	
 	var input = readlineSync.question("Please provide build directory name: ");
	console.log(input);
	buildModel.setSourceFolder(input);
	var input = readlineSync.question("Please provide ZIP file name (Default: samsung.zip): ");
	console.log(input + "\n");
	buildModel.setZipName(input);
	var input = readlineSync.question("Please provide IP address : ");
	console.log(input + "\n");
	buildModel.setIPAddress(input);
	
	var file = buildModel.getParameterFile();
	var obj = buildModel.getBuildData();
	 
	jsonfile.writeFile(file, obj, {spaces: 2});
}