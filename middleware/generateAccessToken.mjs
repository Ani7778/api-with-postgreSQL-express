import jwt from'jsonwebtoken';
//import secret from '../config.mjs';

async function generateAccessToken(id, name) {
    const payload = {
        id,
        name,
        exp: new Date().setMinutes(new Date().getMinutes() + 10),
    }

    const accessToken = await jwt.sign(payload, "SECRET_KEY_RANDOM");
    return accessToken;
}

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            res.status(403).json({
                "error": {
                    "code": '"NO_AUTHORIZED_USER',
                    "message": "User no authorized"
                }
            })
        }

        const decodedData = await jwt.verify(token, "SECRET_KEY_RANDOM")

        const actualTimeInSeconds = new Date().getTime();

        if (decodedData.exp - actualTimeInSeconds < 0) {
            res.status(403).json({
                "error": {
                    "code": "EXPIRED_TOKEN",
                    "message": "Token is expired"
                }
            })
        }

        req.user = decodedData;
        next()
    }

    catch(err) {
        console.log(err);
        res .status(403).json({
            "error": {
                "code": "INVALID_TOKEN",
                "message": "Invalid token"
            }
        })
    }
}

export default {
    generateAccessToken,
    authenticateToken
};
