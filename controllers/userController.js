const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@desc register contact
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body;
    // console.log('register the user',req.body) 
    if(!username || !email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory !")
    }

    const userAvailable = await User.findOne({email});
    console.log('user exist', userAvailable);
    if(userAvailable) {
        res.status(400);
        throw new Error ("User already exist !")
    }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("Hash Password", hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })
    console.log(`User created ${user} `);
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else {
        res.status(404);
        throw new Error("User data is not available !")
    }
    res.json({message: "Register the User"})
});

//@desc login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fileds are mandatory !")
    }

    const user = await User.findOne({email});
    //compare password with hash password // user is user that we are stored in database
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "15m" }
        );
        res.status(200).json({accessToken});
    }else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
    // res.status(200).json({message: "login user"});
})


//@desc current user
//@route GET /api/users/current
//@access private method

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user); // give user information !
})




module.exports = {registerUser, loginUser, currentUser};