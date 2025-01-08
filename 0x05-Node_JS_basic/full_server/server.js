const express = require('express');
const router = require('./routes');

const app = express();
const port = 1245;

// Attach the database file path as application-level middleware
app.set('database', process.argv[2]);

// Use the routes
app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;

