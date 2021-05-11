/*const users = [
    {id: 1, name: "user1", email: "user1@mail.ru"},
    {id: 2, name: "user2", email: "user2@gmail.com"},
    {id: 3, name: "user3", email: "user3@bk.ru"},
]*/
const db = require('../modules/database');
const User = require('../models/users');


function getUsers(req, res) {
    User.findAll()
        .then(function(users) {
            return res.send(users);
        })
        .catch(function(err) {
            return res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "Can not find users"
                }
            })
        })
};
/*
function findGigs(req, res) {
    gigDao.findAll().
    then((data) => {
        res.send(data);
    })
        .catch((error) => {
            console.log(error);
        });
}*/

function getSingleUser(req, res) {
    const user = User.findById(req.params.id)
        .then(function(user) {
            return res.send(user);
        })
        .catch(function (err) {
            return res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "The user with the given ID was not found"
                }
            })
        })
};
/*
function findGigById(req, res) {
    gigDao.findById(req.params.id).
    then((data) => {
        res.send(data);
    })
        .catch((error) => {
            console.log(error);
        });
}
*/
function addUser(req, res) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    });

    const result = schema.validate(req.body);

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    User.create(user)
        .then(function(user) {
            return res.send(user);
    })
        .catch(function(err) {
            return res.status(400).send(result.error.details[0].message);
        })

};
/*
function addGig(req, res) {
    let gig = req.body;
    gigDao.create(gig).
    then((data) => {
        res.send(data);
    })
        .catch((error) => {
            console.log(error);
        });
}*/

function deleteUser(req, res) {
    const user = User.deleteById(req.params.id)
        .then(function(data)  {
            return res.status(200).json({
                message: "User deleted successfully",
                user: data
            })
        })
        .catch(function(err) {
            return res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "The user with the given ID was not found"
                }
            })
        })

}
/*
function deleteById(req, res) {
    gigDao.deleteById(req.params.id).
    then((data) => {
        res.status(200).json({
            message: "Gig deleted successfully",
            gig: data
        })
    })
        .catch((error) => {
            console.log(error);
        });
}*/

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    deleteUser
}
