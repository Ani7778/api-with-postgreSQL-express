const users = [
    {id: 1, name: "user1", email: "user1@mail.ru"},
    {id: 2, name: "user2", email: "user2@gmail.com"},
    {id: 3, name: "user3", email: "user3@bk.ru"},
]

function getUsers(req, res) {
    res.send(users);
};

function getSingleUser(req, res) {
    const user = users.find(us => us.id === parseInt(req.params.id));

    if (!user) return res.status(404).json({
        "error": {
            "code": 404,
            "message": "The user with the given ID was not found"
        }
    });

    res.send(user);
};

function addUser(req, res) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    });

    const result = schema.validate(req.body);

    if (result.error) return res.status(400).send(result.error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(user);
    res.send(user);
};

function deleteUser(req, res) {
    const user = users.find(us => us.id === parseInt(req.params.id));

    if(!user) return res.status(404).json({
        "error": {
            "code": 404,
            "message": "The user with the given ID was not found"
        }
    });

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
}

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    deleteUser
}
