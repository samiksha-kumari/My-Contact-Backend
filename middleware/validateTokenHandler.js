const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req, res, next) => {
    //create a token, whenever a user is sending request, the token is actually passed in the header section with the auth field so either you can pass it as bearer token or you can have an authorization field
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1] //extract token
        console.log('token', token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized !")
            }
            console.log('user',decoded.user)
           req.user = decoded.user;
           next();
        });

        if(!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing in the request");
        }
    }
})

module.exports = validateToken;