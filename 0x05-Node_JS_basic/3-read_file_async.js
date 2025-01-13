const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n').filter((line) => line.trim() !== '' && line.includes(','));
      const students = lines.map((line) => line.split(','));
      console.log(`Number of students: ${students.length}`);

      const fields = {};
      students.forEach(([firstName, , , field]) => {
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstName);
      });

      Object.keys(fields).forEach((field) => {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      });

      resolve();
    });
  });
}

module.exports = countStudents;

