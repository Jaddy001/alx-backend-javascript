const http = require('http');

const port = 1245;
const host = 'localhost';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/test') {
    res.statusCode = 200;
    res.end('This is a test page');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

module.exports = server;
