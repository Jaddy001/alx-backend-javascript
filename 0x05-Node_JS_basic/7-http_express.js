const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');
  countStudents(process.argv[2])
    .then(() => res.end())
    .catch((err) => {
      res.end(`${err.message}\n`);
    });
});

app.listen(1245);

module.exports = app;

