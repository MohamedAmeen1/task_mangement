const jwt = require('jsonwebtoken')
require('dotenv').config();

async function auth(req, res, next) {
    // we get the token from headers named authToken
    const token = req.header('authToken');
    // if no token provided we return an error 401
    if (!token) return res.status(401).send({ message: 'acces denied . no token provided' })
    try {
        // we verify the token using secret key from .env file
        const { id, x } = jwt.verify(token, process.env.user_private_key)
        // if token is valid we add the user id to the request object to be userd later on
        req.user_id = id;
        next();
    }
    catch (ex) {
        // if token is invalid we return an error 401
        res.status(401).send({ message: 'Invalid Token' })
    }
}


module.exports = {
    auth,
}