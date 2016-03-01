#! /usr/bin/env node

var fs = require("fs");
var readline = require('readline');

var zip = require("./zip.js");
var buildModel = require('./buildModel.js');

(function(){		
	var parmaterFile = buildModel.getParameterFile();
	
	fs.exists(parmaterFile, function(exists)
		{
			if(exists)
			{
				var rl = readline.createInterface({input: process.stdin, output: process.stdout});
				rl.question("The file " + parmaterFile + " is found, use for packaging?[y/n]", function(answer) {
						if(answer == "y")
						{
							fs.readFile(parmaterFile, 'utf8', function read(err, data) 
							{
								if(err) 
								{
									console.log("The packaging process has been aborted since there was an error while readiing " + paramsFile);
									return;
								}
									
								var result = JSON.parse(data);
								buildModel.setSourceFolder(result.sourceDir);
								buildModel.setDestinationFolder(result.destinationPath);
								buildModel.setZipName(result.zipName); 
								buildModel.setIPAddress(result.IPaddress);
								
								zip.createZIP();
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


	



