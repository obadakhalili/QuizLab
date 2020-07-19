// each request for a quiz ask only for lab_content field

const Quiz = require("../../db/models/Quiz.js");

exports.getAllLabsContent = async (req, res) => {
  try {
    await req.user.populate("quizzes").execPopulate();
    res.json(req.user.quizzes);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

exports.getLabContent = async (req, res) => {
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

exports.updateLabContent = async (req, res) => {
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

exports.deleteLabContent = async (req, res) => {
  res.send("DELETE Lab Content");
};
