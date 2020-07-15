const Quiz = require("../db/models/Quiz.js");

exports.addQuiz = async (req, res) => {
  try {
    await Quiz({ ...req.body, owner: req.user_id }).save();
    res.send("Saved !"); 
  } catch (e) {
    const errors = [];
    let status = 400;
    if (e.name === "ValidationError") {
      Object.values(e.errors).forEach(error => errors.push(error.message));
    } else {
      errors.push("Internal Server Error");
      status = 500;
    }
    res.status(status).json({ errors });
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
