import Sequelize from 'sequelize';
import db from '../modules/database.mjs';

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {msg: 'Name must not be empty'},
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {msg: 'Email must not be empty'},
            isEmail: {msg: 'Must be a valid email address'},
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: 'Password must not be empty'},
        }
    }
}, {
    timestamps: false
})

export default User;
