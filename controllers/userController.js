const userService = require('../services/userServices');

async function getUsers() {
     const result = await userService.getUsers();
     return result;
}

async function getSingleUser(id) {
     const result = await userService.getSingleUser(id);
     return result;
}

async function addUser(name, email, password) {
   const result = await userService.addUser(name, email, password);
   return result;
}

async function loginUser(email, password) {
    const result = await userService.loginUser(email, password);
}

async function deleteUser(id) {
    const result = await userService.deleteUser(id);
    return result;
}

async function updateUser(id, updateUser) {
    const result = await userService.updateUser(id, updateUser);
    return result;
}

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    loginUser,
    deleteUser,
    updateUser
}
