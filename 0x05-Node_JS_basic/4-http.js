const http = require('http');

const port = 1245;
const host = 'localhost';

// Create server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});

// Start server
server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

// Export server (optional, useful for testing)
module.exports = server;

