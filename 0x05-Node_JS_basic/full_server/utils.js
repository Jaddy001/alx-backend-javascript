const fs = require('fs');

const readDatabase = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error('Cannot load the database'));
            } else {
                const lines = data.trim().split('\n').slice(1); // Exclude the header
                const studentsByField = {};
                lines.forEach((line) => {
                    const [firstname, , , field] = line.split(',');
                    if (!studentsByField[field]) studentsByField[field] = [];
                    studentsByField[field].push(firstname);
                });
                resolve(studentsByField);
            }
        });
    });
};

module.exports = readDatabase;

