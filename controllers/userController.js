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

function updateUser(id) {
    return userService.updateUser(id);
}

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    deleteUser,
    updateUser
}
