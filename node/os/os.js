const os = require('os');

console.log(`Platform: ${os.platform()}`); // darwin = mac 
console.log(`Operating System: ${os.type()}`);
console.log(`Up Time: ${os.uptime()}`);
console.log(`Home Directory: ${os.homedir()}`);
console.log(`CPU Architecture: ${os.arch()}`);
console.log(`Total Memory: ${os.totalmem()}`);
console.log(`Free Memory: ${os.freemem()}`);

// annoyingly long =
// console.log(os.cpus());
// console.log(os.networkInterfaces());