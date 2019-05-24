const http = require('http');

// create server object
http.createServer((req, res) => {
  // write response
  res.write('Hello');
  res.end();
}).listen(4000, () => console.log('Sever Running...'));