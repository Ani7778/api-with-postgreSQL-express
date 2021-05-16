const Joi = require('joi');

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    });

    return schema.validate(user);
}

module.exports = validateUser;
