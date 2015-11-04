#! /usr/bin/env node

var zip = require("./zip.js");
var fs = require("fs");
var readline = require('readline');

var processXML = require("./updateWidget.js");
var userInput = require("./userInput.js");

var paramsFile = "paramss.json";
var paramsFileExists = false;

var sourceDir;
var destinationPath;
var zipName;
var IPaddress;
	

console.log("execution began");

readFile();


function readFile()
{		
	console.log("readfile executed");
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
								
								//zip.createZIP(sourceDir, destinationPath, zipName, IPaddress);
								processXML.processWidgetXML(destinationPath, "widgetlist.xml", zipName, IPaddress);	
							});
						}
					rl.close();
				});
			}
			else
			{
				//need to pass a callback function so that call-back is executed after the getUserInput function 
				//execution is complete
				userInput.getUserInputs(receivedInput);

			}
		});
}

function receivedInput(result)
{
	console.log("=======user input: " + result);
}


	



