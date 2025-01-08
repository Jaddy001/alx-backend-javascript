const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello ALX!');
    } else if (req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is the list of our students\n');
        countStudents(process.argv[2])
            .then(() => res.end())
            .catch((err) => {
                res.end(err.message);
            });
    }
});

app.listen(1245);

module.exports = app;

