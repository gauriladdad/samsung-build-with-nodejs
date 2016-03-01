var fs = require("fs");

var sourceFolder;
var zipName;
var zipPath;
var ipAddress;

exports.setSourceFolder = function(folderName)
{
	sourceFolder = folderName;
}

exports.getSourceFolder = function()
{
	return sourceFolder;
}

exports.setZipName = function(zipFileName)
{
	if ( typeof zipFileName !== 'undefined' && zipFileName )
		zipName = zipFileName;
	else
		zipName = "samsung";
	zipPath = process.cwd() + "/" + zipName + ".zip";
}

exports.getZipName = function()
{
	return zipName;
}

exports.getZipFullPath = function()
{
	return zipPath;
}

exports.setIPAddress = function(address)
{
	ipAddress = address;
}

exports.getIPAddress = function()
{
	return "http://" + ipAddress;
}

exports.getParameterFile = function()
{
	return process.cwd() + "/params.json";
}

exports.getZipSize = function()
{
	var stats = fs.statSync(zipPath);
	return (stats["size"] / 1000000.0);
}

exports.getWidgetFilePath = function()
{
	return (process.cwd() + "/widgetlist.xml");
}

exports.getBuildData = function() {
	return {
		"sourceFolder": sourceFolder,
		"zipName": zipName,
		"ipAddress" : ipAddress
	}
}

exports.printData = function() {
	console.log("Source folder: " + sourceFolder);
	console.log("ZIP file name: " + zipName);
	console.log("IP address: " + ipAddress);
}