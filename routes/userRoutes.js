const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../utils/validateUser');
const generateAccessToken = require('../middleware/generateAccessToken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/',  generateAccessToken.authenticateToken, async function(req, res) {
    const users = await userController.getUsers();
    res.status(200).json(users);
});

router.get('/:id',async function(req, res) {
    const user = await userController.getSingleUser(req.params.id);
    res.status(200).json(user);
});

router.post('/', async function (req, res) {
    const result = await validation.validateUser(req.body);

    if(result.error) {
        res.status(400).json({
            "error": {
                "code": "INVALID_PARAMETERS",
                "message": result.error.details[0].message
            }
        });
    }

    const password = req.body.password;
    const hashPassword = bcrypt.hashSync(password, 7);

    // const user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashPassword
    // };

    const addedUser = await userController.addUser(req.body.name, req.body.email, hashPassword);
    res.status(200).json(addedUser);
});

router.post('/login', async function (req, res) {
    const {email, password} = req.body
    const result = await userController.loginUser(email, password);

    res.status(200).json(result);
})


router.delete('/:id', async function (req, res) {
    const deletedUser = await userController.deleteUser(req.params.id);

    res.status(200).json({
        message: `User with ID ${req.params.id} and deleted successfully`,
    })
})

router.put('/:id', async function (req, res) {
    const result = await validation.validateUpdatedUser(req.body);

    if(result.error) {
        res.status(400).json({
            "error": {
                "code": "INVALID_PARAMETERS",
                "message": result.error.details[0].message
            }
        });
    }

    const user = {
        name: req.body.name,
        email: req.body.email
    };

    const updatedUser = await userController.updateUser(req.params.id, req.body);

    if(!updatedUser) {
        const addedUser = await userController.addUser(user);
        res.status(200).json(addedUser);
    }

    res.status(200).json({
        message: "User updated successfully",
        user: user
    })
});

module.exports = router;
