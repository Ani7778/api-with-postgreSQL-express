const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
require('dotenv').config();
const apiErrorHandler = require('./middleware/apiErrorHandler');

const port = process.env.PORT;

const db = require('./models/index');

app.use(express.json());
app.use('/users', userRoutes);
app.use(apiErrorHandler);

app.listen(port, function () {
    // db.sync();
    console.log(`Listening on port ${port} ...`)
});
