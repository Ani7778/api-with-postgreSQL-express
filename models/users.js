// const Sequelize  = require('sequelize');
// const db = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {msg: 'Name must not be empty'},
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Email must not be empty'},
                isEmail: {msg: 'Must be a valid email address'},
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Password must not be empty'},
            }
        }
    }, {
        timestamps: false
    })
    return User;
};
