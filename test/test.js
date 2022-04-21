const os = require('../lib/OSUtils');

console.log('\n');
console.log('OS Utils');
console.log('\n');

console.log(`Platform: ${os.platform()}`);
console.log(`CPUs: ${os.cpuCount()}`);
console.log('\n');

console.log(`System Uptime (s): ${os.systemUptime()}`);
console.log(`Process Uptime (s): ${os.processUptime()}`);
console.log('\n');

console.log(`Free Memory (Kb): ${os.freeMemory()}`);
console.log(`total Memory (Kb): ${os.totalMemory()}`);
console.log(`Free Memory (%): ${os.freeMemoryPercentage()}`);
console.log('\n');

console.log(`Load Usage (%): ${os.loadAverage()}`);
console.log(`Load Usage 1 (%): ${os.loadAverage(1)}`);
console.log(`Load Usage 5 (%): ${os.loadAverage(5)}`);
console.log(`Load Usage 15 (%): ${os.loadAverage(15)}`);
console.log('\n');

os.cpuUsage().then((v) => console.log(`CPU Usage (%): ${v}`));
os.freeCpuUsage().then((v) => console.log(`CPU Free (%): ${v}`));

console.log('\n');