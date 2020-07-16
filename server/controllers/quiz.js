const Quiz = require("../db/models/Quiz.js");

exports.addQuiz = async (req, res) => {
  try {
    await Quiz({ ...req.body, owner: req.user_id }).save();
    res.end();
  } catch (e) {
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map(({ message } )=> message);
      return res.status(400).json(errors);
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.getQuiz = async (req, res) => {
  // handle wrong format ids and internal server error
  res.json(await Quiz.find({ _id: req.params.id }));
};

exports.updateQuiz = async (req, res) => {
  res.send("PATCH Quiz");
};

exports.deleteQuiz = async (req, res) => {
  res.send("DELETE Quiz");
};
