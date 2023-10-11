const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8'); // Read the CSV file synchronously

    // Split the data into lines and filter out empty lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) {
      console.error('Cannot load the database: The file is empty');
      return;
    }

    let students = 0;
    const fieldCounts = {};
    const fieldNames = {};

    // Loop through the lines, starting from the second line (index 1)
    for (const line of lines.slice(1)) {
      const [firstName, , , field] = line.split(',');

      if (fieldCounts[field]) {
        fieldCounts[field] += 1;
        fieldNames[field].push(firstName);
      } else {
        fieldCounts[field] = 1;
        fieldNames[field] = [firstName];
      }

      students += 1;
    }

    console.log(`Number of students: ${students}`);

    for (const field of Object.keys(fieldCounts)) {
      console.log(`Number of students in ${field}: ${fieldCounts[field]}. List: ${fieldNames[field].join(', ')}`);
    }
  } catch (error) {
    console.error(`Cannot load the database: ${error.message}`);
  }
}

export.moduls =