const jwt = require('jsonwebtoken');
const JWT_SECRET = "jaiorfniosafhnasa";

const fetchUser = (req,res,next) => {

    // get user from jwt token and add id to req object
    let token = req.header('auth-token'); // name the header of the req
    if(!token){
        // if there is no token
        res.status(401).send({"error":"Please Authenticate using valid token"});
    }
    try{
        let data = jwt.verify(token, JWT_SECRET);// verify the user data and save the first parameter from the jwt token ie. data
        req.user = data.user; //sending the user data to req for the next --> auth.js
        next(); // ------> auth.js
        
    } catch (error){
        // catch the errors
        console.log(error);
        res.status(401).send({"error":"Please Authenticate using valid token"});
    }
}

module.exports = fetchUser;