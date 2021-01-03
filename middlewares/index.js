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

exports.setPseudorandomAndSignatureCookies = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token-signature", req.signature, {
    httpOnly: true,
    sameSite: true,
    secure: isProduction
  });
  const pseudorandom = Math.floor(Math.random() * 1000000000);
  res.cookie("pseudorandom", pseudorandom, {
    sameSite: true,
    secure: isProduction
  });
  next();
};

exports.setHeaderAndPayloadCookie = (req, res, next) => {
  res.cookie("token-header.payload", req.tokenHeaderAndPayload, {
    sameSite: true,
    secure: process.env.NODE_ENV === "production"
  });
  next();
};
