const userService = require('../services/userServices');

async function getUsers(limit, offset) {
     const result = await userService.getUsers(limit, offset);
     return result;
}

async function getSingleUser(id) {
     const result = await userService.getSingleUser(id);
     return result;
}

async function addUser(user) {
   const result = await userService.addUser(user);
   return result;
}

async function loginUser(email, password) {
    const result = await userService.loginUser(email, password);
    return result;
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
