const Sequelize  = require('sequelize');

const db = new Sequelize('d2a66jnp9f7436', 'rwskffaxixtihq', '7b9faf6399f1a0001241e291e953f6547f6257b40f7847726f2041567ac2b25b', {
    host: 'ec2-54-220-170-192.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

module.exports = db;
