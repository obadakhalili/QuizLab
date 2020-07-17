const Quiz = require("../db/models/Quiz.js");

exports.addQuiz = async (req, res) => {
  try {
    await Quiz({ ...req.body, owner: req.user._id }).save();
    res.end();
  } catch (e) {
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map(({ message })=> message);
      return res.status(400).json(errors);
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id });
    if (!quiz) {
      throw "Quiz not found";
    }
    res.json(quiz.lab_content);
  } catch (e) {
    if (e.name === "CastError" || e === "Quiz not found") {
      res.status(400).send("Quiz not found");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    await req.user.populate("quizzes").execPopulate();
    res.json(req.user.quizzes);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id });
    if (!quiz) {
      throw "Quiz not found";
    }
    quiz.title = req.body.title;
    quiz.lab_content = req.body.labContent;
    const quizIsModified = quiz.isModified("title") || quiz.isModified("lab_content");
    await quiz.save();
    res.json({ quizIsModified });
  } catch (e) {
    const errors = [];
    const status = 400;
    if (e.name === "ValidationError") {
      Object.values(e.errors).forEach(({ message }) => errors.push(message));
    } else if (e.name === "CastError" || e === "Quiz not found") {
      errors.push("Quiz not found");
    } else {
      return res.status(500).send("Internal Server Error");
    }
    res.status(status).json(errors);
  }
};

exports.deleteQuiz = async (req, res) => {
  res.send("DELETE Quiz");
};
