import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const database = process.argv[2]; // Get database file from arguments

    try {
      const students = await readDatabase(database);
      const fields = Object.keys(students).sort();
      const lines = ['This is the list of our students'];

      fields.forEach((field) => {
        const studentList = students[field];
        lines.push(`Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}`);
      });

      res.status(200).send(lines.join('\n'));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const database = process.argv[2]; // Get database file from arguments
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase(database);
      const studentList = students[major] || [];
      res.status(200).send(`List: ${studentList.join(', ')}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default StudentsController;

