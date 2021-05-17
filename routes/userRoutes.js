const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../utils/validateUser');

const router = express.Router();

router.get('/',  async function(req, res) {
    try {
        const users = await userController.getUsers();
        res.status(200).json(users);
    }
    catch(error) {
         res.status(404).json({
            "error": {
                "code": 404,
                "message": error.message
            }
        });
    }
});

router.get('/:id', async function(req, res) {
    try {
        const user = await userController.getSingleUser(req.params.id);
        if(!user) {
            throw new Error('User not found');
        }
        res.status(200).json(user);
    }

    catch(error) {
         res.status(404).json({
            "error": {
                "code": 404,
                "message": error.message
            }
        });
    }
});

router.post('/', async function (req, res) {
    try {
        const result = await validation.validateUser(req.body);

        if(result.error) {
            res.status(400).json({
                "error": {
                    "code": 400,
                    "message": result.error.details[0].message
                }
            });
        }

        const user = {
            name: req.body.name,
            email: req.body.email
        };

        const addedUser = await userController.addUser(user);
        res.status(200).json(addedUser);
    }

    catch (error) {
        res.status(400).json(error.message)
    }
});

router.delete('/:id', async function (req, res) {
    try {
        const deletedUser = await userController.deleteUser(req.params.id);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        res.status(200).json({
            message: `User with ID ${req.params.id} and deleted successfully`,
        })
    } catch (error) {
        res.status(404).json({
            "error": {
                "code": 404,
                "message": error.message
            }
        })
    }
})

router.put('/:id', async function (req, res) {
    try {
        const result = await validation.validateUpdatedUser(req.body);

        if(result.error) {
            res.status(400).json({
                "error": {
                    "code": 400,
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
    }
    catch(error) {
        res.status(404).json({
            "error": {
                "code": 404,
                "message": error.message
            }
        });
    }
});

module.exports = router;
