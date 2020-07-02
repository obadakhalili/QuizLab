const User = require("../db/models/User.js");
const { setCookies } = require("../helpers");

exports.signup = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = (await user.generateAuthToken()).split(".");
    await setCookies(token, res);
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

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = (await user.generateAuthToken()).split(".");
    await setCookies(token, res);
    res.send(user.name);
  } catch (e) {
    if (e === 401) {
      res.status(401).send("Bad Credentials");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};
