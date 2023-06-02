const { verifyToken } = require("../utils/jwt");

const checkAuthToken = (req, res, next) => {
  const token = req.headers.access_token;

  const isValid = verifyToken(token);

  if (isValid) {
    req.user_id = isValid.id;
    next();
  } else {
    res.status(401).json({ message: "Auth token invalid" });
  }
};

module.exports = checkAuthToken;
