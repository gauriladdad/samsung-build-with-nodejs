#!/usr/bin/env node

var zip = require("./zip.js");
var prompt = require('prompt');
var fs = require("fs");
var readline = require('readline');

var paramsFile = "params.json";
var paramsFileExists = false;

var sourceDir;
var destinationPath;
var zipName;
var IPaddress;
		
function readFile()
{		
	fs.exists(paramsFile, function(exists)
		{
			if(exists)
			{
				paramsFileExists = true;
				
				var rl = readline.createInterface({input: process.stdin, output: process.stdout});
				rl.question("The file " + paramsFile + " is found, use for packaging?[yes/no]", function(answer) {
						if(answer == "yes")
						{
							fs.readFile(paramsFile, 'utf8', function read(err, data) 
							{
								if(err) 
								{
									console.log("The packaging process has been aborted since there was an error while readiing " + paramsFile);
									return;
								}
									
								var result = JSON.parse(data);
								console.log("The packaging will use following inputs: ");
								sourceDir = result.sourceDir; console.log("sourceDir: " + sourceDir);
								destinationPath = result.destinationPath; console.log("destinationPath: " + destinationPath);
								zipName = result.zipName; console.log("zipName: " + zipName);
								IPaddress = result.IPaddress; console.log("IPaddress: " + IPaddress);
								
								package();
							});
						}
					rl.close();
				});
			}
			else
			{
				getUserInput();
			}
		});
}

function getUserInput()
{
	// Start the prompt 
	prompt.start();
	// Get two properties from the user: username and email 
	prompt.get(['sourceDir', 'destinationPath', 'zipName', 'IPaddress'], function (err, result) 
	{
		sourceDir = result.sourceDir;
		destinationPath = result.destinationPath;
		zipName = result.zipName;
		IPaddress = result.IPaddress;
		
		var paramObj = {"sourceDir" : sourceDir, "destinationPath" : destinationPath,"zipName" : zipName,"IPaddress" : IPaddress};
		var paramsData = JSON.stringify(paramObj);
		
		if(paramsFileExists)
			console.log("The packaging process is updating file " + paramsFile + " to re-use in next build process!") ;
		else
			console.log("The packaging process is creating file " + paramsFile + " to re-use in next build process!") ;
		
		//Asynchronously writes data to a file, replacing the file if it already exists. 
		fs.writeFile(paramsFile, paramsData, function (err) {
				if (err) 
				{
					console.log("The packaging process has been aborted since there was an error while updating " + paramsFile);
					throw err;
				}	
				if(paramsFileExists)
					console.log('The param.json file has been updated with above inputs.');
				else
					console.log('A param.json file has been created with above inputs.');
				package();
			}
		);
	});
}		

module.exports = {
	package: function() 
	{
		readFile();
		zip.createZIP(sourceDir, destinationPath, zipName, IPaddress);
	}
}


	



