import fs from 'fs/promises';

export async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n').slice(1).filter((line) => line.trim());
    const result = {};

    lines.forEach((line) => {
      const [firstname, field] = line.split(',');
      if (!result[field]) {
        result[field] = [];
      }
      result[field].push(firstname);
    });

    return result;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

