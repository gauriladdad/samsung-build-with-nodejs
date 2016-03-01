
var prompt = require('prompt');
var fs = require("fs");

exports.getUserInputs = function(callBack)
{
	var schema = {
    properties: {
			zipName: { pattern: /^[0-9]+$/, message: 'please enter a valid file name', required: true },
			IPaddress: { pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, 
			message: 'please enter a valid IP address', 
			required: true },
			sourceDir: { validator: /^[0-9]+$/,
				message: 'source dir', 
				required: true },
			destinationPath: { validator: /^[0-9]+$/, 
				message: 'destination path', 
				required: true }
		}
	};
  
	// Start the prompt 
	prompt.start();
	
	prompt.get(schema, function (err, result) 
	{
		if (err) { return onErr(err); }

		sourceDir = result.sourceDir;
		destinationPath = result.destinationPath;
		zipName = result.zipName;
		IPaddress = result.IPaddress;
		
		var paramObj = {"sourceDir" : sourceDir, "destinationPath" : destinationPath, "zipName" : zipName, "IPaddress" : IPaddress};
		var paramsData = JSON.stringify(paramObj);

		callBack(result);
	});

	function onErr(err) 
	{
    	console.log("There was problem with reading user input: " + err);
    	return ;
  	}
	
}