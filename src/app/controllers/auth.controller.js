const randToken = require("rand-token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const tokenMethods = require("../../middlewares/token.middlewares");


exports.register = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const user = await User.findOne(req.body);

    console.log(!user);
    if(user) {
        return res.json({ status: 'error', error: "This username already existed" });
    } else {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = {
            username: username,
            password: hashPassword
        }
        const createUser = User.create(newUser);
        if(!createUser) {
            return res.json({
                status: 'error',
                error: 'Some problems!'
            });
        }
        return res.send({
            username,
        });
    }
};


exports.login = async (req, res, next) => {
    
    console.log(req.body);

    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({username: username});
    
    if(!user){
        return res.json({ status: 'error', error: "Wrong Username!"});
    }
    
    const validPassword = bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.json({ status: "error", error: "Wrong password!"});
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "10m";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "Secret_but_not_secret_i_dont'_know";

    const accessToken = await tokenMethods.generateToken(
        { username: username},
        accessTokenSecret,
        accessTokenLife
    )

    if(!accessToken) {
        return res.json({ status: "Error"}).send("Login failed");
    }

    refreshToken = randToken.generate(100);

    if(!user.refreshToken) {
        await User.updateOne(
            {username}, 
            {
                $set: {
                    refreshToken: refreshToken
                }
            }
        )

        //            
    } else {
        refreshToken = user.refreshToken;
    }

    res.json({ 
        status: "ok", 
        message: "Successfully", 
        accessToken, 
        refreshToken, 
        user});
    next();
};
