const http = require('http');
const fs = require('fs');

const PORT = 1245;

// Function to count students
const countStudents = (databasePath) => new Promise((resolve, reject) => {
  fs.readFile(databasePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.trim().split('\n');
    const students = lines.slice(1).map((line) => line.split(','));

    const fields = {};
    students.forEach(([name, , , field]) => {
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(name);
    });

    let output = `Number of students: ${students.length}\n`;
    Object.entries(fields).forEach(([field, names]) => {
      output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    });

    resolve(output.trim());
  });
});

// Create HTTP server
const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2] || '')
      .then((message) => {
        res.writeHead(200);
        res.end(`This is the list of our students\n${message}`);
      })
      .catch((error) => {
        res.writeHead(500);
        res.end(error.message);
      });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

