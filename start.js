#! /usr/bin/env node

var zip = require("./zip.js");
var fs = require("fs");
var readline = require('readline');

var paramsFile = "params.json";
var paramsFileExists = false;

var sourceDir;
var destinationPath;
var zipName;
var IPaddress;

(function(){		
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
								
								zip.createZIP(sourceDir, destinationPath, zipName, IPaddress);
							});
						}
					rl.close();
				});
			}
			else
			{
				console.log("The parameters data file is missing");
			}
		});
})();


	



