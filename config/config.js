const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "postgres",
    "ssl":true,
    "dialectOptions":{
      "ssl":{
        "require":true,
        "rejectUnauthorized": false
      }
    }
  }
}


