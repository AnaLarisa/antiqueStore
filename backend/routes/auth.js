const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

function authenticate (email, password) {
    return email === userInDB.email && password === userInDB.password
      ? userInDB
      : false
  }

const userInDB = {
    id: 'agent',
    email: 'arilazar5@gmail.com',
    password: 'Blazar1253'
  }

//REGISTER
router.post("/register", async (req, res) => {
    const data = {
        uid: new Date().getTime(),
        name: req.body.username,
    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        uid: data.uid,
    });

    
    let user = authenticate('arilazar5@gmail.com', 'Blazar1253')
    if (user) {
        axios.post(`https://api-eu.cometchat.io/v2.0/users`, JSON.stringify(data),{
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'apikey': '3a96c515af9a86e67ec716d23973b18b28d7081c',
                'appid': '208328d714ad2a41'
            } 
        }).then(res=>{
            console.log('success on adding user on cometchat');
        })
    }else {
        res
            .status(401)
            .json({
                message: 'Your email or password is wrong!'
            })
    }

    try {
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password &&
        res.status(401).json("Wrong credentials!");

        //creates a web token for the person that logs in to be able to manage the client database
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        //separates the password from the other information and next, it sends the response to the user containing anything but the password (others)
        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
    console.log(res.status);
});

module.exports = router;
