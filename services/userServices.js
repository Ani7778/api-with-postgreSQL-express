const User = require('../models/users');

function getUsers() {
   return User.findAll();
}

function getSingleUser(id) {
   return User.findByPk(id);
}

function addUser(user) {
   return User.create(user);
}

function deleteUser(id) {
   return User.destroy({where: {id}});
}

function updateUser(id) {
   return User.findByPk(id);
}

module.exports = {
   getUsers,
   getSingleUser,
   addUser,
   deleteUser,
   updateUser
};
