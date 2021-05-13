

const User = require('../models/users');

const Joi = require('joi');

function getUsers(req, res) {
    User.findAll()
        .then(function(users) {
             res.send(users);
        })
        .catch(function() {
             res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "Can not find users"
                }
            })
        })
}


function getSingleUser(req, res) {
     User.findByPk(req.params.id).
        then(function(user) {
            if(!user) {
                throw new Error('User not found');
            }
             res.send(user);
        })
        .catch(function(error) {
            res.status(404).json({
                "error": {
                    "code": 404,
                    "message": error.message
                }
            })
        })
}



function addUser(req, res) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    });

    const result = schema.validate(req.body);

    const user = {
        name: req.body.name,
        email: req.body.email
    };

    User.create(user)
        .then(function(user) {
             res.send(user);
        })
    .catch(function () {
        res.status(500).json(result.error.details[0]);
    })
}


function deleteUser(req, res) {
    User.destroy({where: {id: req.params.id}})
        .then(function(user)  {
             res.status(200).json({
                message: `User with ID ${req.params.id} deleted successfully`,
                user
            })
        })
        .catch(function() {
             res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "The user with the given ID was not found"
                }
            })
        })

}

function updateUser(req, res) {
    User.update(req.body.name, req.body.email).
    then(function(data) {
        res.status(200).json({
            message: "User updated successfully",
            gig: data
        })
    })
        .catch(function(error) {
            res.status(404).json(error);
        });
}

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    deleteUser,
    updateUser
}
