const Quiz = require("../db/models/Quiz.js");
const { parse } = require("flatted");

exports.addQuiz = async (req, res) => {
  try {
    const labContent = parse(req.body.labContent);
    const quiz = Quiz({
      lab_content: req.body.labContent,
      title: labContent.mainSection.title,
      show_results: labContent.options.showQuizResults,
      allowed_attempts: labContent.options.allowedAttempts,
      owner: req.user._id
    });
    if (!labContent.options.openQuiz) {
      const startDate = new Date(`${labContent.options.startDate} ${labContent.options.startTime}`);
      const closeDate = new Date(`${labContent.options.closeDate} ${labContent.options.closeTime}`);
      const startDateTime = startDate.getTime();
      const closeDateTime = closeDate.getTime();
      if (startDateTime !== startDateTime) {
        throw "Start date input is invalid";
      } else if (closeDateTime !== closeDateTime) {
        throw "Close date input is invalid";
      }
      if (startDate >= closeDate) {
        throw "Close date should be less that start date, duh!";
      } else {
        quiz.start_date = startDate;
        quiz.close_date = closeDate;
      }
    }
    await quiz.save();
    res.end();
  } catch (e) {
    const errors = [];
    if (e.name === "ValidationError") {
      Object.values(e.errors).forEach(({ message })=> errors.push(message));
    } else if (["Close date should be less that start date, duh!", "Start date input is invalid", "Close date input is invalid"].includes(e)) {
      errors.push(e);
    } else {
      return res.status(500).send("Internal Server Error");
    }
    res.status(400).json(errors);
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
    const labContent = parse(req.body.labContent);
    const quiz = await Quiz.findOne({ _id: req.params.id, owner: req.user._id });
    if (!quiz) {
      throw "Quiz not found";
    }
    quiz.lab_content = req.body.labContent;
    quiz.title = labContent.mainSection.title;
    quiz.allowed_attempts = labContent.options.allowedAttempts;
    quiz.show_results = labContent.options.showQuizResults;
    if (!labContent.options.openQuiz) {
      const startDate = new Date(`${labContent.options.startDate} ${labContent.options.startTime}`);
      const closeDate = new Date(`${labContent.options.closeDate} ${labContent.options.closeTime}`);
      const startDateTime = startDate.getTime();
      const closeDateTime = closeDate.getTime();
      if (startDateTime !== startDateTime) {
        throw "Start date input is invalid";
      } else if (closeDateTime !== closeDateTime) {
        throw "Close date input is invalid";
      }
      if (startDate >= closeDate) {
        throw "Close date should be less that start date, duh!";
      } else {
        quiz.start_date = startDate;
        quiz.close_date = closeDate;
      }
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
    } else if (["Close date should be less that start date, duh!", "Start date input is invalid", "Close date input is invalid"].includes(e)) {
      errors.push(e);
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
      return res.status(400).send("Quiz not found");
    }
    res.status(500).send("Internal Server Error");
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
      return res.status(400).send("Quiz not found");
    }
    res.status(500).send("Internal Server Error");
  }
};
