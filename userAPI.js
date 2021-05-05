const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(express.json());

app.use('/users', userRoutes);


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Listening on port ${port} ...`)
});
