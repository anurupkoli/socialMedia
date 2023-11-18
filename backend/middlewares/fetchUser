const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_TOKEN;

//fetchUserD middleware to authenticate token
const fetchUserD = (req, res, next) => {
  //fetching token from req.header
  const token = req.header("auth-token");

  //return error if invalid token
  if (!token) {
    res.status(400).json("Authenticate using valid token");
  }
  try {
    let userData = jwt.verify(token, JWT_SECRET);

    //responding with req.user as current user
    req.user = userData.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = fetchUserD;
