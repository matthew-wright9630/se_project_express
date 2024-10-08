const jwt = require("jsonwebtoken");
const AuthentincationError = require("../errors/authentication-error")
const {JWT_SECRET} = require("../utils/config");

const handleAuthError = (res) => {
  throw new AuthentincationError("Authorization error")
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
