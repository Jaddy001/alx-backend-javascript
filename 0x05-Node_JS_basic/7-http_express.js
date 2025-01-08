const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

// Function to parse the CSV file and count students
const countStudents = (database) => {
    return new Promise((resolve, reject) => {
        fs.readFile(database, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error('Cannot load the database'));
            } else {
                const lines = data.trim().split('\n').slice(1); // Remove header
                const studentsByField = {};
                lines.forEach((line) => {
                    const [firstname, , , field] = line.split(',');
                    if (!studentsByField[field]) studentsByField[field] = [];
                    studentsByField[field].push(firstname);
                });

                const summary = [`Number of students: ${lines.length}`];
                Object.keys(studentsByField)
                    .sort()
                    .forEach((field) => {
                        summary.push(
                            `Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`
                        );
                    });

                resolve(summary.join('\n'));
            }
        });
    });
};

// Routes
app.get('/', (req, res) => {
    res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
    const database = process.argv[2];
    if (!database) {
        res.status(500).send('Database file not provided');
        return;
    }

    try {
        const result = await countStudents(database);
        res.send(`This is the list of our students\n${result}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

