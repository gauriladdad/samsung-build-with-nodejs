var fs = require("fs");

var sourceFolder;
var destinationFolder;
var zipName;
var ipAddress;

exports.getParameterFile = function()
{
	return "params.json";
}

exports.setSourceFolder = function(path)
{
	sourceFolder = path;
}

exports.getSourceFolder = function()
{
	return sourceFolder;
}

exports.setDestinationFolder = function(path)
{
	destinationFolder = path;
}

exports.getDestinationFolder = function()
{
	return destinationFolder;
}

exports.setZipName = function(zipFileName)
{
	zipName = zipFileName + ".zip";
}

exports.getZipName = function()
{
	return zipName;
}

exports.setIPAddress = function(address)
{
	ipAddress = address;
}

exports.getIPAddress = function()
{
	return ipAddress;
}

exports.getZipSize = function()
{
	var stats = fs.statSync(destinationFolder + "/" + zipName);
	return (stats["size"] / 1000000.0);
	
}

exports.getWidgetFilePath = function()
{
	return destinationFolder + "/widgetlist.xml";
}