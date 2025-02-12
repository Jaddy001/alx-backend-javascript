const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;

// Function to read and process the student database
const countStudents = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            reject(new Error('Cannot load the database'));
            return;
        }
        const lines = data.trim().split('\n').slice(1);
        const students = {};
        let total = 0;

        lines.forEach((line) => {
            const fields = line.split(',');
            if (fields.length >= 2) {
                const name = fields[0];
                const field = fields[fields.length - 1];
                if (!students[field]) {
                    students[field] = [];
                }
                students[field].push(name);
                total += 1;
            }
        });

        let output = `Number of students: ${total}`;
        for (const [field, names] of Object.entries(students)) {
            output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        }
        resolve(output);
    });
});

// Route for /
app.get('/', (req, res) => {
    res.send('Hello ALX!');
});

// Route for /students
app.get('/students', async (req, res) => {
    const database = process.argv[2]; // Get database filename from command line args
    if (!database) {
        res.status(500).send('Database not provided');
        return;
    }

    try {
        const result = await countStudents(database);
        res.send(`This is the list of our students\n${result}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export app for testing
module.exports = app;

