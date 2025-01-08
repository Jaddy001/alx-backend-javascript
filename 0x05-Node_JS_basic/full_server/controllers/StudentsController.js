const readDatabase = require('../utils');

class StudentsController {
    static async getAllStudents(req, res) {
        const database = req.app.get('database'); // Get the database file path

        try {
            const students = await readDatabase(database);
            const response = ['This is the list of our students'];
            Object.keys(students)
                .sort()
                .forEach((field) => {
                    response.push(
                        `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`
                    );
                });
            res.status(200).send(response.join('\n'));
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async getAllStudentsByMajor(req, res) {
        const { major } = req.params;
        const database = req.app.get('database'); // Get the database file path

        if (!['CS', 'SWE'].includes(major)) {
            res.status(500).send('Major parameter must be CS or SWE');
            return;
        }

        try {
            const students = await readDatabase(database);
            const list = students[major] || [];
            res.status(200).send(`List: ${list.join(', ')}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = StudentsController;

