os-utils
========

An operating system utility library. Some methods are wrappers of node libraries
and others are calculations made by the module.


## Installation

One line installation with [npm](http://npmjs.org). 
```bash
npm install os-utils
```

Then in your code 
```js
var os 	= require('os-utils');


os.cpuUsage(function(v){
	console.log( 'CPU Usage (%): ' + v );
});

os.cpuFree(function(v){
	console.log( 'CPU Free:' + v );
});
```


## Usage

The following methods are available:


### Calculate CPU usage for the next second
This is not an average of CPU usage like it is in the "os" module. The callback will receive a parameter with the value.
```js
os.cpuUsage( function(value) { /* ... */ } );
```
	

### Calculate free CPU for the next second
This is not based on average CPU usage like it is in the "os" module. The callback will receive a parameter with the value.
```js
os.cpuFree( function(value) { /* ... */ } );
```

	
### Get the platform name
```js
os.platform();
```


### Get number of CPUs
```js
os.cpuCount()
```


### Get current free memory
```js
os.freemem()
```


### Get total memory
```js
os.totalmem()
```


### Get a current free memory percentage
```js
os.freememPercentage()
```


### Get the number of seconds the system has been running for
```js
os.sysUptime();
```
	
	
### Get the number of seconds the process has been running
```js
os.processUptime() 
```


### Get average load for 1, 5 or 15 minutes
```js
os.loadavg(1)
os.loadavg(5)
os.loadavg(15)
```
