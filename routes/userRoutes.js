const express = require('express');
const userController = require('../controllers/userController');
const Joi = require('joi');

const router = express.Router();

router.get('/', function(req, res) {
   userController.getUsers()
        .then(function(users) {
            res.send(users);
            console.log(users);
        })
        .catch(function() {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "Can not find users"
                }
            })
        })
});

router.get('/:id', function(req, res) {
    userController.getSingleUser(req.params.id)
        .then(function(user) {
            if(!user) {
                throw new Error('User not found');
            }
            res.send(user);
            console.log(user);
        })
        .catch(function(error) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": error.message
                }
            })
        })
});

router.post('/', function (req, res) {
    const result = validateUser(req.body);

    const user = {
        name: req.body.name,
        email: req.body.email
    };

    userController.addUser(user)
        .then(function(user) {
            res.send(user);
        })
        .catch(function () {
            res.status(500).json(result.error.details[0].message);
        })
});


router.delete('/:id', function (req, res) {
    userController.deleteUser(req.params.id)
        .then(function(user)  {
            if(!user) {
                throw new Error('User not found');
            }
            res.status(200).json({
                message: `User with ID ${req.params.id} and deleted successfully`,
            })
        })
        .catch(function(error) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": error.message
                }
            })
        })
});

router.put('/:id', function (req, res) {
    const result = validateUser(req.body);
    if(result.error) {
        res.status(404).json({
            "error": {
                "code": 404,
                "message": result.error.details[0].message
            }
        });
    }

    const user = {name: req.body.name,
    email: req.body.email};

    userController.updateUser(req.params.id)
        .then(function() {
            if(!user) {
                throw new Error('User not found');
            }

            res.status(200).json({
                message: "User updated successfully",
                user: user
            })
        })
        .catch(function(error) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": error.message
                }
            });
        });
});

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    });

    return schema.validate(user);
}

module.exports = router;
