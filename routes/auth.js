const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchuser');

const JWT_SECRET = "jaiorfniosafhnasa";
 
/*---------------------------------------------------------------------------------------- */
// ROUTE 1 : Route for the users to sign up securely with the server using secure JWT Auth
router.post('/createuser',
    body('fullName','Name must be 3 char long').isLength({ min: 3 }),
    body('email','Invalid email').isEmail(),
    body('password', 'password must contains 5 char').isLength({ min: 5 }),
    async (req,res) => {

      let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // try-catch block
    try {

      // cheching for user inside the db
      let userFound = await User.findOne({'email':req.body.email});
      if(userFound){
        // if the user found in the db
        res.status(400).json({"error": "Email already exists"});
      }
      
      const salt = bcrypt.genSaltSync(10); // generating a salt for hash password
      const hashPass = await bcrypt.hash(req.body.password, salt); // hashing the user password using salt

      //create a user with the recieved data
      let user = await User.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashPass
        });

      // now send the jwt token after the signup
      // create the user data that you want in payload
      let data = {
        user:{
          id: user.id
        }
      }
      // create your sign for the jwt token
      let authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken});
      console.table(authToken);
      
    } catch (error) {
      // catch the errors
      console.log(error.message);
      // sending error to the client
      res.status(500).json({success, "error":error});
    }
});



/*---------------------------------------------------------------------------------------- */
// ROUTE 3 : Get the user data if the user is authenticated
router.post('/getuser',fetchUser, async (req,res) => {

  try {
    let userid = req.user.id;// got the user in the req using fetchUser middleware
    const userData = await User.findById(userid).select("-password");// find the user with the user id in the db except the password
    res.send(userData); // send user data to the client side

  } catch (error) {
    // catch the errors
    console.log(error.message);
    // sending error to the client
    res.status(500).json({"error":error});
  }

})

module.exports = router;