const Quiz = require("../db/models/Quiz.js");

exports.addQuiz = async (req, res) => {
  new Quiz({ ...req.body, owner: req.user._id }).save();
  res.send("POST Quiz");
};

exports.getQuiz = async (req, res) => {
  res.send("GET Quiz");
};

exports.updateQuiz = async (req, res) => {
  res.send("PATCH Quiz");
};

exports.deleteQuiz = async (req, res) => {
  res.send("DELETE Quiz");
};
