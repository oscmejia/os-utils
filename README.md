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

os.cpuUsage().then((v) => console.log(`CPU Usage (%): ${v}`));
os.freeCpuUsage().then((v) => console.log(`CPU Free (%): ${v}`));
```


## Usage

The following methods are available:


### Calculate CPU usage for the next second
This is not an average of CPU usage like it is in the "os" module. The callback will receive a parameter with the value.
```js
os.cpuUsage().then((v) => { /* ... */ });
```
	

### Calculate free CPU for the next second
This is not based on average CPU usage like it is in the "os" module. The callback will receive a parameter with the value.
```js
os.freeCpuUsage().then((v) => { /* ... */ });
```

	
### Get the platform name
```js
os.platform();
```


### Get number of CPUs
```js
os.cpuCount();
```


### Get current free memory
```js
os.freeMemory();
```


### Get total memory
```js
os.totalMemory();
```


### Get a current free memory percentage
```js
os.freeMemoryPercentage();
```


### Get the number of seconds the system has been running for
```js
os.systemUptime();
```
	
	
### Get the number of seconds the process has been running
```js
os.processUptime();
```


### Get average load for 1, 5 or 15 minutes
```js
os.loadAverage(1);
os.loadAverage(5);
os.loadAverage(15);
```
