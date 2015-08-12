var processXML = require("./updateWidget.js");
var zip = require("./zip.js");
var prompt = require('prompt');

var sourceDir ="C:/dev/dtag/bin/debug/samsung";
var destinationPath="C:/dev/dtag/bin/debug";
var zipName = "samsung";
var IPaddress = "http://10.1.1.189";


 
	// Start the prompt 
	prompt.start();
  
	// Get two properties from the user: username and email 
	prompt.get(['sourceDir', 'destinationPath', 'zipName', 'IPaddress'], function (err, result) {
    
	sourceDir = result.sourceDir;
	destinationPath = result.destinationPath;
	zipName = result.zipName;
	IPaddress = result.IPaddress;
});




//zip.createZIP(sourceDir, destinationPath, zipName);

//processXML.processWidgetXML(destinationPath, "widgetlist.xml", zipName, IPaddress);	

	



