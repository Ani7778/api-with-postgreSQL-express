const jwt = require('jsonwebtoken');
const {secret} = require('../config');

async function generateAccessToken(id, name) {
    const payload = {
        id,
        name
    }

    const accessToken = await jwt.sign(payload, secret, {expiresIn: '24h'});
    return accessToken;
}

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            res.status(403).json({
                "error": {
                    "code": 403,
                    "message": "User no authorized"
                }
            })
        }

        const decodedData = jwt.verify(token, secret)

        req.user = decodedData;
        next()
    }
    catch(err) {
        console.log(err);
        res .status(403).json({
            "error": {
                "code": 403,
                "message": "Invalid token"
            }
        })
    }
}

module.exports = {
    generateAccessToken,
    authenticateToken
};
