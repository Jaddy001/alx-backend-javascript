const fs = require('fs');

function countStudents(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
        const fields = data[0].split(',');
        const students = data.slice(1).map(line => line.split(','));

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
    } catch (error) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;

