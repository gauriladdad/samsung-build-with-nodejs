#! /usr/bin/env node

var fs = require("fs");
var readlineSync = require('readline-sync');
var jsonfile = require('jsonfile');
	
var zip = require("./zip.js");
var buildModel = require('./buildModel.js');
var captureParameters = require('./captureParameters.js');

(function(){		
	fs.exists(buildModel.getParameterFile(), function(exists)
	{
		if(exists)
		{
			readCurrentData();
		}
		else
		{
			captureParameters.getUserInputs();
			generateBuild();
		}
	});
})();

function generateBuild(){		
	zip.createZIP();
}

function readCurrentData(){
	
	jsonfile.readFile(buildModel.getParameterFile(), function(err, fileData) {
		buildModel.setSourceFolder(fileData.sourceFolder); 
		buildModel.setZipName(fileData.zipName); 
		buildModel.setIPAddress(fileData.ipAddress);
		
		console.log("Current configuration: ");
		buildModel.printData();
			
		if (readlineSync.keyInYN('Do you want to use this configuration?')) {
			generateBuild();
		} else {
			captureParameters.getUserInputs();
			generateBuild();
		}
	})
}

	



