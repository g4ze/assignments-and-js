
const jwt=require('jsonwebtoken')
const jwtpass="secret";
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    try{
        jwt.verify(req.headers.authorization, jwtpass);
    }
    catch(e){
        return res.status(404).send("auth failed");
    }
    next();
}

module.exports = userMiddleware;