const jwt = require("jsonwebtoken");

function verify (req, res, next) {
const authHeader = req.headers.token;
if (authHeader){
    const token = authHeader.split(" ")[1]; //only grab token value and not the "Bearer"

    jwt.verify(token, process.env.SECRET_KEY, (err,user) => {       //verify token is valid
        if (err) res.status(403).json({message: "Invalid Token"});
        req.user = user;
        next();
    })
} else {
    return res.status(401).json({message: "Not authenticated"})
}
}

module.exports = verify;
