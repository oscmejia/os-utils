var _os = require('os');

exports.platform = function(){ 
    return process.platform;
}

exports.cpuCount = function(){ 
    return _os.cpus().length;
}

exports.sysUptime = function(){ 
    //seconds
    return _os.uptime();
}

exports.processUptime = function(){ 
    //seconds
    return process.uptime();
}



// Memory
exports.freemem = function(){
    return _os.freemem() / ( 1024 * 1024 );
}

exports.totalmem = function(){

    return _os.totalmem() / ( 1024 * 1024 );
}

exports.freememPercentage = function(){
    return _os.freemem() / _os.totalmem();
}



// Hard Disk Drive
exports.harddrive = function(callback){
    
    require('child_process').exec('df -k', function(error, stdout, stderr) {
    
        var total = 0;
        var used = 0;
        var free = 0;
    
        var lines = stdout.split("\n");
    
        var str_disk_info = lines[1].replace( /[\s\n\r]+/g,' ');
    
        var disk_info = str_disk_info.split(' ');

        total = Math.ceil((disk_info[1] * 1024)/ Math.pow(1024,3));
        used = Math.ceil(disk_info[2] * 1024 / Math.pow(1024,3)) ;
        free = Math.ceil(disk_info[3] * 1024 / Math.pow(1024,3)) ;

        callback(total, free, used);
    });
}

/*
* Returns All the load average usage for 1, 5 or 15 minutes.
*/
exports.allLoadavg = function(){ 
    
    var loads = _os.loadavg();
    		
    return loads[0]+', '+loads[1]+', '+loads[2]; 
} 

/*
* Returns the load average usage for 1, 5 or 15 minutes.
*/
exports.loadavg = function(_time){ 

    if(_time === undefined || (_time !== 5 && _time !== 15) ) _time = 1;
	
    var loads = _os.loadavg();
    var v = 0;
    if(_time == 1) v = loads[0];
    if(_time == 5) v = loads[1];
    if(_time == 15) v = loads[2];
		
    return v; 
}


exports.cpuFree = function(callback){ 
    getCPUUsage(callback, true);
}

exports.cpuUsage = function(callback){ 
    getCPUUsage(callback, false);
}

function getCPUUsage(callback, free){ 
	
    var stats1 = getCPUInfo();
    var startIdle = stats1.idle;
    var startTotal = stats1.total;
	
    setTimeout(function() {
        var stats2 = getCPUInfo();
        var endIdle = stats2.idle;
        var endTotal = stats2.total;
		
        var idle 	= endIdle - startIdle;
        var total 	= endTotal - startTotal;
        var perc	= idle / total;
	  	
        if(free === true)
            callback( perc );
        else
            callback( (1 - perc) );
	  		
    }, 1000 );
}

function getCPUInfo(callback){ 
    var cpus = _os.cpus();
	
    var user = 0;
    var nice = 0;
    var sys = 0;
    var idle = 0;
    var irq = 0;
    var total = 0;
	
    for(var cpu in cpus){
		
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }
	
    var total = user + nice + sys + idle + irq;
	
    return {
        'idle': idle, 
        'total': total
    };
}

