This is a command line utility built using node.js for packaging of application for samsung Tv (mainly 2013/2014).

After you have built your application and want to load it on Samsung TV, there are certain steps to be followed : 

1. create a zip of the build 

2. serve widgetlist.xml. (During development of the application, we need to make sure that  )
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

###How Does this simplify and save the time?

I believe if same application needs to be installed multiple times with minor modifications : 

1. The ZIP is not required to be created manually each time the build is generated. This utility handles that for you.

2. The widget object structure, inside the widgetlist.xml file is as below:

	<widget id="VideoLoad2">
      <title>Videoload</title>
      <description>video load application</description>
      <compression size="0.000481" type="zip"/>
      <download>http://1.2.2./samsung</download>
    </widget>
	
-- This file is a must for Samsung TV to recognize the application to be installed. The utility creates the same for you.
	
-- While installing the same zip subsequently, samsung TV sometimes fails to recognise it as new application and serves the old build. To avoid this problem, the id of the widget needs to be changed and must be unique each time. 

-- The compression size is important to be specified, size of 0 would lead to application not being installed.

3. If there are multiple builds being used (e.g. an old application version using different set of libraries and currently in bug fix cycle, alongside current one),
all that is needed to be done is to give the -build folder path- to utility and rest would be handled for you.

4. Once installed, this utility can be used for all the samsung applications you are building. 	
