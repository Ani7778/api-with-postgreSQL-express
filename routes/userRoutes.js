const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../utils/validateUser');
const bcrypt = require('bcrypt');
const generateAccessToken = require('../utils/generateAccessToken');

const router = express.Router();


router.get('/',  async function(req, res) {
        const users = await userController.getUsers();
        res.status(200).json(users);

        if(!users) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": 'Users not found'
                }
            });
        }
});

router.get('/:id', async function(req, res) {
        const user = await userController.getSingleUser(req.params.id);
        if(!user) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "User not found"
                }
            });
        }
        res.status(200).json(user);
});

router.post('/', async function (req, res) {
        const result = await validation.validateUser(req.body);

        if(result.error) {
            res.status(400).json({
                "error": {
                    "code": 400,
                    "message": result.error.details[0].message
                }
            });
        }

        const password = req.body.password;
        const hashPassword = bcrypt.hashSync(password, 7);

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        };

        const addedUser = await userController.addUser(user);
        res.status(200).json(addedUser);
});

router.post('/login', async function (req, res) {
        const {email, password} = req.body
        const user = await userController.loginUser({email});

        if (!user) {
           return res.status(400).json({
               "error": {
                   "code": 400,
                   "message": `User ${email} not found`
               }
           });
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword) {
            res.status(400).json({
                "error": {
                    "code": 400,
                    "message": "Password is not correct"
                }
            });
        }

        const token = await generateAccessToken(user.id, user.name)
        return res.json({token})
})

router.delete('/:id', async function (req, res) {
        const deletedUser = await userController.deleteUser(req.params.id);
        if (!deletedUser) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "User not found"
                }
            })
        }
        res.status(200).json({
            message: `User with ID ${req.params.id} and deleted successfully`,
        })
})

router.put('/:id', async function (req, res) {
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
});

module.exports = router;
