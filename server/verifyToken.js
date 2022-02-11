const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;

  // console.log("authHeader",authHeader); //returns the entire Bearer + accessToken

  if (authHeader) { //if authHeader exist, 
    const token = authHeader.split(" ")[1];

    // console.log("token",token); //returns just the token itself without the "Bearer"

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {  //verify token with token, and secretkey as params
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
