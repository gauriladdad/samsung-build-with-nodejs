# samsung-build-with-nodejs
This is a command line utility built using node.js for packaging of application for samsung Tv (mainly 2013/2014).


After you have built your application and want to load it on Samsung TV, there are certain steps to be followed : 
1. create a zip of the build 
2. serve widgetlist.xml 

This will enable Samsung TV to load your application. 

This tool tries to simplify that. Please follow below steps to make this usable for you: 

1. install this package. ("npm install -g samsungbuild")

2. open package.json and for changes to be made please refer to the section  ====Amends to proejct.json=====

3. Now the utility has been configured, from command prompt run "npm run build". You shall find your app ready to be relayed at destinationPath.
(Currently this needs to be done from where this package is installed. I am working on providing a command which can be run from anywhere).

====Amends to proejct.json=====

sourceDir => the location where the samsung app build is located.

zipName => name you would like to give your zip.

destinationPath => location where you want the packaged app to be loaded (perhaps the location from which you want the app to be relayed)

IPaddress => IP address of server from where the app would be loaded

you can either create widgetlist.xml under destinationPath OR one will be created by this utility. 




