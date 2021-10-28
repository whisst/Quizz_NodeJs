const User = require("../app/models/user");
const tokenMethods = require("./token.middlewares");

exports.isAuth = async (req, res, next) => {
    const headerToken = req.headers.cookie;
    const accessToken = headerToken.substr(headerToken.indexOf("=") + 1)

    console.log(accessToken);

    if(!accessToken) {
        return res.json({ status: "error", message: "Invalid Token"});
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "Secret_but_not_secret_i_dont'_know";
    const verified = await tokenMethods.verifyToken(accessToken, accessTokenSecret);

    if(!verified) {
        return res.json({ status: "error"});
    }

    const user = User.findOne(verified.payload.username);
    req.user = user;
    
    next();
}
