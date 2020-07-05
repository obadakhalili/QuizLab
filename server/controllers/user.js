const User = require("../db/models/User.js");
const {
  setPseudorandomAndSignatureCookies,
  setTokenHeaderAndPayloadCookie
} = require("../helpers");
const sharp = require("sharp");

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const [header, payload, signature] = (await user.generateAuthToken()).split(
      "."
    );
    setPseudorandomAndSignatureCookies(signature, res);
    setTokenHeaderAndPayloadCookie(`${header}.${payload}`, res);
    res.send(user.name);
  } catch (e) {
    if (e === "Bad Credentials") {
      res.status(401).send(e);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.logout = (_, res) => {
  res.clearCookie("token-header.payload");
  res.clearCookie("token-signature");
  res.clearCookie("pseudorandom");
  res.end();
};

exports.signup = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const [header, payload, signature] = (await user.generateAuthToken()).split(
      "."
    );
    setPseudorandomAndSignatureCookies(signature, res);
    setTokenHeaderAndPayloadCookie(`${header}.${payload}`, res);
    res.send(user.name);
  } catch (e) {
    const errors = [];
    let status = 400;
    if (e.name === "ValidationError") {
      for (let error in e.errors) {
        errors.push(e.errors[error].message);
      }
    } else if (e.code === 11000) {
      errors.push("Email alrady exists. Try different email");
    } else {
      errors.push("Internal Server Error");
      status = 500;
    }
    res.status(status).json({ errors });
  }
};

exports.getAccount = async (req, res) => {
  res.json(req.user);
};

exports.updateAccount = async (req, res) => {
  const allowedUpdates = ["name", "email", "password"];
  for (let update in req.body) {
    if (allowedUpdates.includes(update)) {
      req.user[update] = req.body[update];
    }
  }
  try {
    await req.user.save();
    res.end();
  } catch (e) {
    const errors = [];
    let status = 400;
    if (e.name === "ValidationError") {
      for (let error in e.errors) {
        errors.push(e.errors[error].message);
      }
    } else if (e.code === 11000) {
      errors.push("Email alrady exists. Try different email");
    } else {
      errors.push("Internal Server Error");
      status = 500;
    }
    res.status(status).json({ errors });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await req.user.remove();
    res.end();
  } catch {
    res.status(500).end();
  }
};

exports.getAvatar = async (req, res) => {
  setTokenHeaderAndPayloadCookie(req.tokenHeaderAndPayload, res);
  res.set("Content-Type", "image/png");
  res.send(req.user.avatar);
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      throw "You probably should upload a photo first";
    }
    req.user.avatar = await sharp(req.file.buffer)
      .resize(250)
      .png()
      .toBuffer();
    await req.user.save();
    setTokenHeaderAndPayloadCookie(req.tokenHeaderAndPayload, res);
    res.end();
  } catch (e) {
    if (e === "You probably should upload a photo first") {
      return res.status(400).send(e);
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteAvatar = async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    setTokenHeaderAndPayloadCookie(req.tokenHeaderAndPayload, res);
    res.send("Deleted Successfully");
  } catch {
    res.status(500).send("Internal Server Error");
  }
};
