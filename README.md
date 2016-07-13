os-utils
========

An operating system utility library. Some methods are wrappers of node libraries
and others are calculations made by the module.


## Installation

One line installation with [npm](http://npmjs.org). 

	npm install os-utils

Then in your code 
	
	var os 	= require('os-utils');


	os.cpuUsage(function(v){
		console.log( 'CPU Usage (%): ' + v );
	});

	os.cpuFree(function(v){


## Usage

The following methods are available:


### Calculate CPU usage for the next second
This is not an average of CPU usage like it is in the "os" module. The callback will receive a parameter with the value.

	os.cpuUsage( function(value) { /* ... */ } );
	

### Calculate free CPU for the next second
This is not based on average CPU usage like it is in the "os" module. The callback will receive a parameter with the value.

	os.cpuFree( function(value) { /* ... */ } );

	
### Get the platform name

	os.platform();


### Get number of CPUs

	os.cpuCount()


### Get current free memory

	os.freemem()


### Get total memory

	os.totalmem()


### Get a current free memory percentage

	os.freememPercentage()


### Get the number of miliseconds the system has been running for

	os.sysUptime();
	
	
### Get the number of miliseconds the process has been running

	os.processUptime() 


### Get average load for 1, 5 or 15 minutes

	os.loadavg(1)
	os.loadavg(5)
	os.loadavg(15)
