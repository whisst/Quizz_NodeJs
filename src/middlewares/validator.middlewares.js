const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function(req, res, next) {
    const {name, username, password} = req.body;
    var validate_email = re.test(String(username).toLowerCase());

    if(!username || typeof username !== "string"){
        return res.json({ status: "Error", error: "invalid username!" })
    }

    if(!password || typeof password !== "string") {
        return res.json({ status: "Error", error: "Invalid password!"})
    }

    if(validate_email == false){
        return res.json({ status: "Error", error: "Invalid Email"})
    }
    next();
}