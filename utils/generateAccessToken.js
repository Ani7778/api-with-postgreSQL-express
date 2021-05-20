const jwt = require('jsonwebtoken');
const {secret} = require('../config');

async function generateAccessToken(id, name) {
    const payload = {
        id,
        name
    }

    const token = await jwt.sign(payload, secret, {expiresIn: '24h'});
    return token;
}

module.exports = generateAccessToken;
