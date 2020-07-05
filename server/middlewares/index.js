const User = require("../db/models/User.js");
const { verify } = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const { _id } = await verify(
      `${req.cookies["token-header.payload"]}.${req.cookies["token-signature"]}`,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({ _id });
    req.user = user;
    req.tokenHeaderAndPayload = req.cookies["token-header.payload"];
    next();
  } catch {
    res.status(401).send("Not Authenticated");
  }
};

exports.validatePseudorandom = (req, res, next) => {
  if (req.headers.pseudorandom !== req.cookies.pseudorandom) {
    return res.status(401).send("Not Authenticated");
  }
  next();
};
