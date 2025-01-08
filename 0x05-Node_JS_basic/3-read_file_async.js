const fs = require('fs');

function countStudents(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(new Error('Cannot load the database'));
                return;
            }

            const lines = data.trim().split('\n');
            const fields = lines[0].split(',');
            const students = lines.slice(1).map(line => line.split(','));

            console.log(`Number of students: ${students.length}`);
            
            const groups = {};
            students.forEach(student => {
                const field = student[3];
                if (!groups[field]) groups[field] = [];
                groups[field].push(student[0]);
            });

            for (const [field, names] of Object.entries(groups)) {
                console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
            }

            resolve();
        });
    });
}

module.exports = countStudents;

