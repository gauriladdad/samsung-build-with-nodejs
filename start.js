var processXML = require("./updateWidget.js");
var zip = require("./zip.js");

var sourceDir ="C:/dev/dtag/bin/debug/samsung";
var destinationPath="C:/dev/dtag/bin/debug";
var zipName = "samsung";
var IPaddress = "http://10.1.1.189";


zip.createZIP(sourceDir, destinationPath, zipName);

processXML.processWidgetXML(destinationPath, "widgetlist.xml", zipName, IPaddress);	

	



