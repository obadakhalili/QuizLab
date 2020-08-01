const Quiz = require("../db/models/Quiz.js");

exports.addQuiz = async (req, res) => {
  try {
    const {
      title,
      options,
      labContent
    } = req.body;
    const quiz = Quiz({
      lab_content: labContent,
      title,
      show_results: options.showQuizResults,
      allowed_attempts: options.allowedAttempts,
      time_limit: !options.timeLimit ? undefined : options.timeLimit * 60 * 1000,
      owner: req.user._id
    });
    if (!options.openQuiz) {
      const startDate = new Date(`${options.startDate} ${options.startTime}`);
      const closeDate = new Date(`${options.closeDate} ${options.closeTime}`);
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
    const {
      title,
      options,
      labContent
    } = req.body;
    const quiz = await Quiz.findOne({ _id: req.params.id, owner: req.user._id });
    if (!quiz) {
      throw "Quiz not found";
    }
    quiz.lab_content = labContent;
    quiz.title = title;
    quiz.allowed_attempts = options.allowedAttempts;
    quiz.show_results = options.showQuizResults;
    quiz.time_limit = !options.timeLimit ? undefined : options.timeLimit * 60 * 1000;
    if (!options.openQuiz) {
      const startDate = new Date(`${options.startDate} ${options.startTime}`);
      const closeDate = new Date(`${options.closeDate} ${options.closeTime}`);
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
    } else {
      quiz.start_date = undefined;
      quiz.close_date = undefined;
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
