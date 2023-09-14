const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //If there is not token send from request then status 401 unauthorized
  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401).json("hell");
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403).json("bloody hell"); //invalid token
    req.name = decoded.name;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWT;
