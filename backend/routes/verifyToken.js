const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.body.token;
  //console.log("body " + req.body.token);
  //console.log("headers " + JSON.stringify(req.headers));
  if (authHeader) {
    const token = authHeader;
    //console.log("token : " + token);
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
        //console.log("token is invalid");
      }
      req.user = user;
      next();
    });
  } else {
    //console.log("not auth");
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  verifyToken(req, res, () => { 
    if (req.body.isAdmin) {
      next();
    } else {
      console.log('aici pica');
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
