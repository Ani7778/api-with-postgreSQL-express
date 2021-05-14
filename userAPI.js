const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const db = require('./modules/database');

app.use(express.json());

app.use('/users', userRoutes);

const port = process.env.PORT;

app.listen(port, function () {
    db.sync();
    console.log(`Listening on port ${port} ...`)
});
