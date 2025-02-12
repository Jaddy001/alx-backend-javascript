const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;

// Function to count students
const countStudents = (databasePath) => new Promise((resolve, reject) => {
  fs.readFile(databasePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.trim().split('\n').filter((line) => line.length > 0);
    const students = lines.slice(1).map((line) => line.split(','));

    const fields = {};
    students.forEach(([name, , , field]) => {
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(name);
    });

    let output = `Number of students: ${students.length}`;
    Object.entries(fields).forEach(([field, names]) => {
      output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
    });

    resolve(output);
  });
});

// Route: Homepage
app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

// Route: Students list
app.get('/students', (req, res) => {
  const databasePath = process.argv[2];

  countStudents(databasePath)
    .then((message) => {
      res.send(`This is the list of our students\n${message}`);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;

