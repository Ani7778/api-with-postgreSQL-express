// /**
//  * @swagger
//  *      components:
//  *      schemas:
//  *          User:
//  *              type: object
//  *              required:
//  *                  - name
//  *                  - email
//  *                  - password
//  *              properties:
//  *                  id:
//  *                      type: integer
//  *                      dedescription: The auto-generated id of the user.
//  *                  name:
//  *                      type: string
//  *                      description: Name of the user.
//  *                  email:
//  *                      type: string
//  *                      description: Email of the user.
//  */

// /**
//  * @swagger
//  *      tags:
//  *          name: Users
//  *          description: User API
//  */

import express from 'express';
import userController from '../controllers/userController.mjs';
import validation from'../utils/validateUser.mjs';
import bcrypt from 'bcrypt';
import generateAccessToken from '../middleware/generateAccessToken.mjs';

const router = express.Router();

/**
 * @swagger
 * /users/:
 *      get:
 *          summary: Get all users
 *          responses:
 *              "200":
 *                  description: Get all users
 *              "404":
 *                  description: No authorized user
 */

router.get('/',  generateAccessToken.authenticateToken, async function(req, res) {
    const users = await userController.getUsers();
    res.status(200).json(users);

    if(!users) {
        res.status(404).json({
            "error": {
                "code": "USERS_NOT_FOUND",
                "message": 'Users not found'
            }
        });
    }
});

/**
 * @swagger
 * /users/{id}:
 *      get:
 *          summary: Get user by id
 *          parameters:
 *            - in: path
 *              name: id
 *              type: integer
 *              required: true
 *              description: The user id
 *          responses:
 *              "200":
 *                  description: Get user by id
 *              "404":
 *                  description: User not found
 */

router.get('/:id',async function(req, res) {
    const user = await userController.getSingleUser(req.params.id);
    if(!user) {
        res.status(404).json({
            "error": {
                "code": "USER_NOT_FOUND",
                "message": "User not found"
            }
        });
    }
    res.status(200).json(user);
});

/**
 * @swagger
 * /users/:
 *      post:
 *          summary: Create new user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *          responses:
 *              "200":
 *                  description: Create new user
 *              "400":
 *                  description: Invalid parameters
 */

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

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    };

    const addedUser = await userController.addUser(user);
    res.status(200).json(addedUser);
});

/**
 * @swagger
 * /users/login:
 *      post:
 *          summary: Get access token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *          responses:
 *              "200":
 *                  description: Successful acces token
 *              "404":
 *                  description: User not found
 *              "400":
 *                  description: Password is not correct
 */

router.post('/login', async function (req, res) {
    const {email, password} = req.body
    const user = await userController.loginUser({email});

    if (!user) {
        return res.status(404).json({
            "error": {
                "code": "USER_NOT_FOUND",
                "message": `User ${email} not found`
            }
        });
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if(!validPassword) {
        res.status(400).json({
            "error": {
                "code": "INCORRECT_PASSWORD",
                "message": "Password is not correct"
            }
        });
    }

    const accessToken = await generateAccessToken.generateAccessToken(user.id, user.name)
    return res.json({accessToken})
})

/**
 * @swagger
 * /users/{id}:
 *      delete:
 *          summary: Delete user by id
 *          parameters:
 *            - in: path
 *              name: id
 *              type: integer
 *              required: true
 *              description: The user id
 *          responses:
 *              "200":
 *                  description: Successful delete
 *              "404":
 *                  description: User not found
 */

router.delete('/:id', async function (req, res) {
    const deletedUser = await userController.deleteUser(req.params.id);
    if (!deletedUser) {
        res.status(404).json({
            "error": {
                "code": "USER_NOT_FOUND",
                "message": "User not found"
            }
        })
    }
    res.status(200).json({
        message: `User with ID ${req.params.id} and deleted successfully`,
    })
})

/**
 * @swagger
 * /users/{id}:
 *      put:
 *          summary: Update user
 *          parameters:
 *            - in: path
 *              name: id
 *              type: integer
 *              required: true
 *              description: The user id
 *          requestBody:
 *              required: true
 *              content:
 *              application/json:
 *          responses:
 *              "200":
 *                  description: Successful update
 *              "400":
 *                  description: Invalid parameters
 */

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

export default router;
