const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../utils/validateUser');
const generateAccessToken = require('../middleware/generateAccessToken');
const bcrypt = require('bcrypt');
const apiSuccessHandler = require('../middleware/apiSuccessHandler');

const router = express.Router();

router.get('/', generateAccessToken.authenticateToken ,async function(req, res, next) {
    let { page, size} = req.query;

    const result = await userController.getUsers({limit: size, offset: page});

    res.respData = result;

    next();
});

router.get('/:id',async function(req, res, next) {
    const result = await userController.getSingleUser(req.params.id);
    res.respData = result;

    next();
});

router.post('/', async function (req, res, next) {
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

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    };

    const addedUser = await userController.addUser(user);
    res.respData = addedUser;

    next();
});

router.post('/login', async function (req, res, next) {
    const {email, password} = req.body
    const result = await userController.loginUser(email, password);

    res.respData = result;

    next();
})


router.delete('/:id', async function (req, res, next) {
    const result = await userController.deleteUser(req.params.id);

    res.respData = result;

    next();
})

router.put('/:id', async function (req, res, next) {
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
        res.respData = addedUser;
    }

    res.respData = updatedUser;

    next();
});

module.exports = router;
