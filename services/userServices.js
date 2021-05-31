const User = require('../models/users');
const { QueryTypes } = require('sequelize');
const { db } = require('../models/index');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { extractSequlizeResponse } = require('../utils/helperFunctions');
const generateAccessToken = require('../middleware/generateAccessToken');
const ApiError = require('../middleware/ApiError');

async function getUsers() {
   //return User.findAll();
   const result = await db.query('SELECT id, name, email FROM users', {type: sequelize.QueryTypes.SELECT});

   if(result.length === 0) {
      throw ApiError.notFound("Users not found");
   }

   console.log(result);
   return result;
}

async function getSingleUser(id) {
   // return User.findByPk(id);
   const result = await db.query(
       `SELECT id, name, email FROM users WHERE id = '${id}'`,
       {type: sequelize.QueryTypes.SELECT}
   );

   if(result.length === 0) {
      throw ApiError.notFound("User not found");
   }

   console.log(result);
   return result;
}

async function addUser(name, email, password) {
   //return User.create(user);
   const result = await db.query(
       `INSERT INTO users (name, email, password) 
        VALUES ('${name}', '${email}', '${password}')
        RETURNING name, email, password`,
        {type: sequelize.QueryTypes.INSERT}
   );
   console.log(result);
   return result;
}

async function loginUser(email, password) {
   //return User.findOne({where: email});
   const query = `SELECT id, name, email, password FROM users WHERE email = '${email}'`;
   const result = await db.query(query, {type: sequelize.QueryTypes.SELECT});
   const userData = extractSequlizeResponse(result);
   const validPassword = bcrypt.compareSync(password, userData.password)

   const accessToken = await generateAccessToken.generateAccessToken(userData.id, userData.name);

   if (!validPassword) {
       throw ApiError.badRequest("Password is not correct");
   }

   return {accessToken};
}

async function deleteUser(id) {
   //return User.destroy({where: id});
   const result = await db.query(`DELETE FROM users WHERE id = '${id}'`, {type: sequelize.QueryTypes.DELETE});

   if(result.length === 0) {
      throw ApiError.notFound("User not found");
   }

   console.log(result);
   return result;
}

async function updateUser(id, name, email, password) {
   // const updatedUser = User.update(updateUser,
   //       {where: {id: id}
   //    });
   const result = await db.query(
       `UPDATE users 
        SET  name = '${name}', email = '${email}', password = '${password}' 
        WHERE id = '${id}'`,
       {type: sequelize.QueryTypes.UPDATE}
       );

   console.log(result);
   return result;

   if(!result) {
      addUser(name, email, password);
   }
}

module.exports = {
   getUsers,
   getSingleUser,
   addUser,
   loginUser,
   deleteUser,
   updateUser
};
