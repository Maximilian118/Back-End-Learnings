const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'src', 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(content);
    }); 
  }

  if (req.url === '/api/users') {
    const users = [
      { name: 'Rich Miller', age: 25},
      { name: 'Luna Dinklevolt', age: 75},
    ]
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(users));
  }
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));