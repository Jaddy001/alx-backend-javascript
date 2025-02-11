const http = require('http');
const fs = require('fs');
const path = require('path');

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) {
        resolve('This is the list of our students\n');
        return;
      }

      const students = {};
      let totalStudents = 0;

      lines.slice(1).forEach(line => {
        const fields = line.split(',');
        if (fields.length > 1) {
          const name = fields[0].trim();
          const field = fields[fields.length - 1].trim();

          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(name);
          totalStudents++;
        }
      });

      let response = `This is the list of our students\nNumber of students: ${totalStudents}\n`;
      for (const [field, names] of Object.entries(students)) {
        response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }
      resolve(response.trim());
    });
  });
}

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.writeHead(200);
    res.end('Hello ALX!\n');
  } else if (req.url === '/students') {
    const databasePath = process.argv[2];
    if (!databasePath) {
      res.writeHead(500);
      res.end('Database file is required\n');
      return;
    }

    try {
      const studentsList = await countStudents(databasePath);
      res.writeHead(200);
      res.end(studentsList + '\n');
    } catch (error) {
      res.writeHead(500);
      res.end(error.message + '\n');
    }
  } else {
    res.writeHead(404);
    res.end('Not Found\n');
  }
});

app.listen(1245);

module.exports = app;

