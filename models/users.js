const Sequelize  = require('sequelize');
const db = require('../modules/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: 'Name must not be empty'}
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {msg: 'Email must not be empty'},
            isEmail: {msg: 'Must be a vali email address'}
        }
    }
}, {
    timestamps: false
})

module.exports = User;
