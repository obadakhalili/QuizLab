const Quiz = require("../db/models/Quiz.js");

exports.addQuiz = async (req, res) => {
  try {
    await Quiz({ ...req.body, owner: req.user._id }).save();
    res.end();
  } catch (e) {
    const errors = [];
    if (e.name === "ValidationError") {
      Object.values(e.errors).forEach(({ message })=> errors.push(message));
      return res.status(400).send(errors);
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.getMyQuizzes = async (req, res) => {
  try {
    const myQuizzes = await Quiz.find({ owner: req.user._id });
    res.json(myQuizzes);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id, owner: req.user._id });
    if (!quiz) {
      throw "Quiz not found";
    }
    quiz.title = req.body.title;
    quiz.allowed_attempts = req.body.allowed_attempts;
    quiz.lab_content = req.body.lab_content;
    if (req.body.openQuiz) {
      quiz.ending_date = undefined;
    } else {
      quiz.ending_date = req.body.ending_date;
    }
    const quizIsModified = quiz.isModified("title") || quiz.isModified("lab_content");
    await quiz.save();
    res.json({ quizIsModified });
  } catch (e) {
    const errors = [];
    if (e.name === "ValidationError") {
      Object.values(e.errors).forEach(({ message }) => errors.push(message));
    } else if (e.name === "CastError" || e === "Quiz not found") {
      errors.push("Quiz not found");
    } else {
      return res.status(500).send("Internal Server Error");
    }
    res.status(400).json(errors);
  }
};

exports.deleteQuizzes = async (req, res) => {
  try {
    const { deletedCount } = await Quiz.deleteMany({
      _id: { $in: req.body },
      owner: req.user._id
    });
    if (deletedCount < 1) {
      throw "Quiz not found";
    }
    res.end();
  } catch (e) {
    if (e.name === "CastError" || e === "Quiz not found") {
      res.status(400).send("Quiz not found");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.getLabContent = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id, owner: req.user._id }, { lab_content: true, _id: false });
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
