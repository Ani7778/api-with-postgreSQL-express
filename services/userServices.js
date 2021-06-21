const { QueryTypes } = require('sequelize');
const { db: { models: { user: Users } } } = require('../models/index');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const bcrypt = require('bcrypt');
const { extractSequlizeResponse } = require('../utils/helperFunctions');
const generateAccessToken = require('../middleware/generateAccessToken');
const ApiError = require('../middleware/ApiError');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');

/**
 *
 * @param limit
 * @param offset
 * @returns {Promise<*>}
 */

async function getUsers({limit = DEFAULT_LIMIT, offset = DEFAULT_PAGE, sortBy}) {
   let options = {
      attributes:  ['id', 'name', 'email'],
      where: {
         name: {
            [Op.like]: '%e%'
         }
      },
      limit,
      offset: (offset - 1) * limit
   };

   if (sortBy) {
      options.order = [sortBy];
   }

   const result = await Users.findAndCountAll(options);

   return result;
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */

async function getSingleUser(id) {
   const result = await Users.findByPk(id);

   if(!result) {
      throw ApiError.notFound("User not found");
   }

   return result;
}

/**
 *
 * @param user
 * @returns {Promise<*>}
 */

async function addUser(user, password) {
   const result = await Users.create(user);

   const hashPassword = bcrypt.hashSync(password, 7);

   return result;
}

/**
 *
 * @param email
 * @param password
 * @returns {Promise<*>}
 */

async function loginUser(email, password) {
   const user = await Users.findOne({where: {email}});
   console.log("userghghghghghghghghghhg")
   console.log(user)

   const validPassword = bcrypt.compareSync(password, user.password)

   const accessToken = await generateAccessToken.generateAccessToken(user.id, user.name);

   if (!validPassword) {
      throw ApiError.badRequest("Password is not correct");
   }

   console.log(accessToken);
   return accessToken;
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */

async function deleteUser(id) {
   const result = Users.destroy({where: id});

   if(!result) {
      throw ApiError.notFound("User not found");
   }

   return result;
}

/**
 *
 * @param id
 * @param name
 * @param email
 * @param password
 * @returns {Promise<*>}
 */

async function updateUser(id, name, email, password) {
   const result = Users.update(updateUser,
         {where: {id: id}
      });

   if(!result) {
      addUser(name, email, password);
   }

   return result;
}

module.exports = {
   getUsers,
   getSingleUser,
   addUser,
   loginUser,
   deleteUser,
   updateUser
};
