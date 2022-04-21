const _os = require('os');

exports.platform = () => process.platform;

exports.cpuCount = () => _os.cpus().length;

exports.systemUptime = () => _os.uptime(); // seconds

exports.processUptime = () => process.uptime(); // seconds

// Memory
exports.freeMemory = () => _os.freemem() / ( 1024 * 1024 );
exports.totalMemory = () => _os.totalmem() / ( 1024 * 1024 );
exports.freeMemoryPercentage = () => _os.freemem() / _os.totalmem();

exports.freeCommand = (callback) =>
{
    // Only Linux
    require('child_process').exec('free -m', (error, stdout, stderr) =>
    {
       const lines = stdout.split("\n");
       const str_mem_info = lines[1].replace( /[\s\n\r]+/g,' ');
       const mem_info = str_mem_info.split(' ')
      
       total_mem    = parseFloat(mem_info[1])
       free_mem     = parseFloat(mem_info[3])
       buffers_mem  = parseFloat(mem_info[5])
       cached_mem   = parseFloat(mem_info[6])
       
       used_mem = total_mem - (free_mem + buffers_mem + cached_mem)
       
       callback(used_mem, cached_mem);
    });
}

// Hard Disk Drive
exports.harddrive = (callback) =>
{
    require('child_process').exec('df -k', (error, stdout, stderr) =>
    {
        let total = 0;
        let used = 0;
        let free = 0;
    
        const lines = stdout.split("\n");
        const str_disk_info = lines[1].replace( /[\s\n\r]+/g,' ');
        const disk_info = str_disk_info.split(' ');

        total = Math.ceil((disk_info[1] * 1024)/ Math.pow(1024,2));
        used = Math.ceil(disk_info[2] * 1024 / Math.pow(1024,2));
        free = Math.ceil(disk_info[3] * 1024 / Math.pow(1024,2));

        callback(total, free, used);
    });
}

// Return process running current 
exports.getProcesses = (nProcess, callback) =>
{    
    // if nprocess is undefined then is function
    if (typeof nProcess === 'function')
    {
        callback = nProcess; 
        nProcess = 0;
    }   
    
    let command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + 10;
    //command = 'ps aux | head -n '+ 11
    //command = 'ps aux | head -n '+ (nProcess + 1)
    if (nProcess > 0)
    {
        command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + (nProcess + 1);
    }
    
    require('child_process').exec(command, (error, stdout, stderr) =>
    {
        let lines = stdout.split("\n");
        lines.shift()
        lines.pop()
       
        let result = ''
        lines.forEach((_item, _i) =>
        {
            let _str = _item.replace( /[\s\n\r]+/g,' ');
            
            _str = _str.split(' ');
            
            // result += _str[10]+" "+_str[9]+" "+_str[2]+" "+_str[3]+"\n";  // process
            result += _str[1] + " " + _str[2] + " " + _str[3] + " " + _str[4].substring((_str[4].length - 25)) + "\n";  // process
        });
        
        callback(result);
    }); 
}

// Returns All the load average usage for 1, 5 or 15 minutes.
exports.allLoadAverage = () =>
{ 
    const loads = _os.loadavg();		
    return loads[0].toFixed(4) + ' / ' + loads[1].toFixed(4) + ' / ' + loads[2].toFixed(4); 
}

// Returns the load average usage for 1, 5 or 15 minutes.
exports.loadAverage = (_time) =>
{ 
    const loads = _os.loadavg();

    switch (_time)
    {
        default:
        case 1:
            return loads[0];
        case 5:
            return loads[1];
        case 15:
            return loads[2];
    }
}

exports.freeCpuUsage = () => getCpuUsage(true);
exports.cpuUsage = () => getCpuUsage(false);

function getCpuUsage(free)
{ 
    return new Promise((resolve, reject) =>
    {
        const stats1 = getCpuInfo();
        const startIdle = stats1.idle;
        const startTotal = stats1.total;
        
        setTimeout(() =>
        {
            const stats2   = getCpuInfo();
            const endIdle  = stats2.idle;
            const endTotal = stats2.total;
            
            const idle  = endIdle - startIdle;
            const total = endTotal - startTotal;
            const perc  = idle / total;
            
            resolve(free === true ? perc : (1 - perc));	
        }, 1000);
    });
}

function getCpuInfo()
{ 
    const cpus = _os.cpus();
	
    let user = 0, nice = 0, sys = 0, idle = 0, irq = 0;
    for (const cpu in cpus)
    {
        if (!cpus.hasOwnProperty(cpu))
        {
            continue;
        }

        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }
	
    return {
        'idle': idle, 
        'total': user + nice + sys + idle + irq
    };
}