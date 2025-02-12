import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            reject(new Error('Cannot load the database'));
            return;
        }

        const students = {};
        const lines = data.trim().split('\n').slice(1); // Skip header

        lines.forEach((line) => {
            const fields = line.split(',');
            if (fields.length >= 2) {
                const name = fields[0];
                const field = fields[fields.length - 1];

                if (!students[field]) {
                    students[field] = [];
                }
                students[field].push(name);
            }
        });

        resolve(students);
    });
});

export default readDatabase;

