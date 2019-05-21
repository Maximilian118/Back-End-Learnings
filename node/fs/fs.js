const fs = require('fs');
const path = require('path');

// create folder
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
  if (err) throw err.stack;
  console.log('Folder created...');
});

// create file and write to it
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 
  'Hello World! ', err => {
  if (err) throw err.stack;
  console.log('File Written...');

  // append file
  fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), 
    'Node.js is the shit', err => {
    if (err) throw err.stack;
    console.log('File Written...');
  });
});

// read file
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
  if (err) throw err.stack;
  console.log(data);
});

// rename file
fs.rename(
  path.join(__dirname, '/test', 'hello.txt'),
  path.join(__dirname, '/test', 'helloworld.txt'),
  err => {
    if (err) throw err;
    console.log('File Renamed...')
  }
);
