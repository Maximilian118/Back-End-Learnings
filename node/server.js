const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // build file path
  let filePath = path.join(__dirname, 'src', req.url === '/' ?
  'index.html' : req.url);

  console.log(filePath);

  // extension of file
  let extname = path.extname(filePath);

  // initial content type
  let contentType = 'text/html';

  //check ext and set content type
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // page not found
        fs.readFile(path.join(__dirname, 'src', '404.html'), (err, content) => {
          res.writeHead(200, {'Content-Type': contentType});
          res.end(content, 'utf8');
        })
      } else {
        // some server error. Most likely 500
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      // success
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf8');
    }
  });
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));