import readDatabase from '../utils.js';

class StudentsController {
    static async getAllStudents(req, res) {
        const database = process.argv[2]; // Get database filename from command line args

        if (!database) {
            res.status(500).send('Database not provided');
            return;
        }

        try {
            const students = await readDatabase(database);
            let response = 'This is the list of our students';
            
            Object.keys(students).sort().forEach((field) => {
                response += `\nNumber of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`;
            });

            res.status(200).send(response);
        } catch (error) {
            res.status(500).send('Cannot load the database');
        }
    }

    static async getAllStudentsByMajor(req, res) {
        const database = process.argv[2];
        const { major } = req.params;

        if (!database) {
            res.status(500).send('Database not provided');
            return;
        }

        if (major !== 'CS' && major !== 'SWE') {
            res.status(500).send('Major parameter must be CS or SWE');
            return;
        }

        try {
            const students = await readDatabase(database);
            res.status(200).send(`List: ${students[major].join(', ')}`);
        } catch (error) {
            res.status(500).send('Cannot load the database');
        }
    }
}

export default StudentsController;

