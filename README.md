This is a command line utility built using node.js for packaging of application for samsung Tv (mainly 2013/2014).

After you have built your application and want to load it on Samsung TV, there are certain steps to be followed : 
1. create a zip of the build 
2. serve widgetlist.xml 
Now, start the server on your machine and sync the application on TV. It will be installed for you.

###How to use ?

This utility has been published as an NPM package. Executing the command "npm install -g samsungbuild" will install this for you.
Now run package-samsung-app and your samsung application is ready to be installed.

###Amends to params.json

sourceDir => the location where the samsung app build is located.

zipName => name you would like to give your zip.

destinationPath => location where you want the packaged app to be loaded (perhaps the location from which you want the app to be relayed)

IPaddress => IP address of server from where the app would be loaded

you can either create widgetlist.xml under destinationPath OR one will be created by this utility. 
