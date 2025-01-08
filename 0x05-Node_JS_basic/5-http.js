const http = require('http');
const fs = require('fs');
const path = require('path');

function countStudents(database) {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        reject(Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1); // Skip the header
      const studentGroups = {};

      students.forEach((student) => {
        const fields = student.split(',');
        if (fields.length > 1) {
          const field = fields[3];
          if (!studentGroups[field]) {
            studentGroups[field] = [];
          }
          studentGroups[field].push(fields[0]);
        }
      });

      const output = [`Number of students: ${students.length}`];
      for (const [field, names] of Object.entries(studentGroups)) {
        output.push(
          `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
        );
      }

      resolve(output.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    const database = process.argv[2];
    if (!database) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Database file path is missing');
      return;
    }

    countStudents(database)
      .then((content) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`This is the list of our students\n${content}`);
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.message);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;

