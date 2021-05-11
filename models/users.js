const Sequelize  = require('sequelize');
const db = require('../modules/database');

class Users extends Model {}

const User = db.define(user, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    email: {
        type: Sequelize.STRING,
        notEmpty: true,
        isEmail: true
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
})

module.exports = User;
