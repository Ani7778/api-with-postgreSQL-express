import User from '../models/users';

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
   return User.destroy({where: id});
}

function updateUser(id, updateUser) {
   const updatedUser = User.update(updateUser,
         {where: {id: id}
      });

   if(!updatedUser) {
      addUser(id);
   }
}

function loginUser(email) {
   return User.findOne({where: email});
}

export default {
   getUsers,
   getSingleUser,
   addUser,
   deleteUser,
   updateUser,
   loginUser
};
