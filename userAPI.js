const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const db = require('./modules/database');

app.use(express.json());

app.use('/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, function () {
    // TODO sync should be done here
    db.sync();
    console.log(`Listening on port ${port} ...`)
});
