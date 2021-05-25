import Joi from 'joi';

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schema.validate(user);
}

function validateUpdatedUser(user) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
    });

    return schema.validate(user);
}

export default {
    validateUser,
    validateUpdatedUser
};
