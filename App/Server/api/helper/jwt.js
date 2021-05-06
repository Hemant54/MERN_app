import jwt from "jsonwebtoken";
import db from "../models/user";
import fs from "fs";
const PRIVATE_KEY = fs.readFileSync("./api/helper/jwtRS256.key");
const PUBLIC_KEY = fs.readFileSync("./api/helper/jwtRS256.key.pub");
const TOKEN_EXPIRY = "1h";

const User = db.User;
/**
 * Generate fresh new token
 *
 * @param      {Object}    details
 * @param      {String}    expiry
 * @param      {Function}  cb
 * @return     {Function}
 */
const signToken = (details = {}, expiry = null) => {
  try {
    const token = jwt.sign(
      {
        data: details,
      },
      PRIVATE_KEY,
      { algorithm: "RS256", expiresIn: expiry || TOKEN_EXPIRY }
    );
    return token;
  } catch (err) {
    throw err.message;
  }
};

/**
 * Call to validate token
 *
 * @param      {string}    token
 * @param      {Function}  cb
 */
const validate = (token = "", cb) => {
  try {
    jwt.verify(token, PUBLIC_KEY, cb);
  } catch (err) {
    return cb("Invalid token", null);
  }
};

/**
 * Verify token availability
 *
 * @param      {Object}  req
 * @return     {String}
 */
const verify = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const isUser = (req, res, next) => {
  const token = verify(req);
  if (!token) {
    return res.withResponse("UNAUTHORIZED", null, 401);
  }
  validate(token, (err, decoded) => {
    if (err) {
      return res.withResponse("TOKEN_EXPIRED", null, 401);
    }
    const { data } = decoded;
    if (data.id) {
      User.findOne({ email: data.email, _id: data.id }).then((user) => {
        if (user) {
          req.user = user;
          return next();
        }
        return res.withResponse("UNAUTHORIZED", null, 403);
      });
    }
  });
};
export { signToken, isUser };
