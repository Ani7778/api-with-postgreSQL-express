const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const db = require('./modules/database');
db.authenticate()
.then(function() {
    console.log('Connection has been established successfully.');
})
.catch(function(err) {
    console.error('Unable to connect to the database:', err);
})

app.use(express.json());

app.use('/users', userRoutes);

const port = process.env.PORT || 3000;


db.sync().then(function() {
    app.listen(port, function () {
        console.log(`Listening on port ${port} ...`)
    });
}).catch(function(err) {
    console.error('Error: ', err);
})