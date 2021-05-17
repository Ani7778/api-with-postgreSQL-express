const userService = require('../services/userServices');

function getUsers() {
     return userService.getUsers();
}

function getSingleUser(id) {
     return userService.getSingleUser(id);
}

function addUser(user) {
   return userService.addUser(user);
}

function deleteUser(id) {
    return userService.deleteUser(id);

}

function updateUser(id, updateUser) {
    return userService.updateUser(id, updateUser);
}

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    deleteUser,
    updateUser
}
