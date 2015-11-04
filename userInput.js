
var prompt = require('prompt');
var fs = require("fs");

exports.getUserInputs = function(callBack)
{
 	// Start the prompt 
	prompt.start();

	prompt.get(['sourceDir', 'destinationPath', 'zipName', 'IPaddress'], function (err, result) 
	{

		if (err) { return onErr(err); }

		sourceDir = result.sourceDir;
		destinationPath = result.destinationPath;
		zipName = result.zipName;
		IPaddress = result.IPaddress;
		
		var paramObj = {"sourceDir" : sourceDir, "destinationPath" : destinationPath,"zipName" : zipName,"IPaddress" : IPaddress};
		var paramsData = JSON.stringify(paramObj);

		callBack(result);
	});

	function onErr(err) 
	{
    	console.log("There was problem with reading user input: " + err);
    	return ;
  	}
	
}