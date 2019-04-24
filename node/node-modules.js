const os = require('os');

const total = os.totalmem();
const free = os.freemem();

console.log(`Total Memory: ${total} Free Memory: ${free}`);

const fs = require('fs');

fs.readdir('./', (err, files) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(files);
  }
});




