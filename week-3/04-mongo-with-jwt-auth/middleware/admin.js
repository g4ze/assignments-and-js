// Middleware for handling auth
const jwt=require('jsonwebtoken')
const jwtpass="secret";
 function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    try{
         jwt.verify(req.headers.authorization, jwtpass);
    }
    catch(e){
        return res.status(404).send("auth failed");
    }
    next();
}

module.exports = adminMiddleware;