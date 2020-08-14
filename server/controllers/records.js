const Record = require("../db/models/Record.js");
const Quiz = require("../db/models/Quiz.js");

exports.getMyRecords = async (req, res) => {
  try {
    const myRecords = await Record.find({ owner: req.user._id });
    for (let i = 0, l = myRecords.length; i < l; i++) {
      await myRecords[i].populate("quiz", ["title", "show_results"]).execPopulate();
    }
    res.json(myRecords);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

exports.attemptQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne(
      { _id: req.body.quizID },
      {
        lab_content: false,
        owner: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        _id: false
      }
    );
    if (!quiz) {
      throw "Quiz not found";
    }
    const entranceDate = new Date();
    if (quiz.start_date) {
      if (entranceDate < quiz.start_date) {
        return res
          .status(201)
          .send(
            "You are early, exam starts at " + quiz.start_date.toLocaleString()
          );
      } else if (entranceDate > quiz.close_date) {
        return res
          .status(201)
          .send(
            "You are late, exam closed at " + quiz.close_date.toLocaleString()
          );
      }
    }
    let record = await Record.findOne({
      quiz: req.body.quizID,
      owner: req.user._id
    });
    if (record) {
      if (record.previous_attempts.length >= quiz.allowed_attempts) {
        return res.status(201).send("You are out of attempts");
      }
    } else {
      record = new Record({ quiz: req.body.quizID, owner: req.user._id });
    }
    record.previous_attempts.push({ start_date: entranceDate });
    await record.save();
    let timeLimit;
    if (quiz.time_limit || quiz.start_date) {
      const difference = quiz.close_date - entranceDate;
      if (difference > quiz.time_limit || !quiz.start_date) {
        timeLimit = quiz.time_limit;
      } else {
        timeLimit = difference;
      }
    }
    res.json({
      viewContent: quiz.shuffle_quiz ? quiz.shuffleQuiz() : quiz.view_content,
      blockAfterAnswer: quiz.block_after_answer,
      timeLimit
    });
  } catch (e) {
    if (e.name === "CastError" || e === "Quiz not found") {
      return res.status(400).send("Quiz not found");
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.submitAnswers = async (req, res) => {
  try {
    const quiz = await Quiz.findOne(
      { _id: req.body.quizID },
      {
        lab_content: true,
        _id: false
      }
    );
    if (!quiz) {
      return res.status(201).send("Quiz was deleted during attempt!");
    }
    const { grade, totalMark } = quiz.gradeAnswers(req.body.answers);
    const record = await Record.findOne({
      quiz: req.body.quizID,
      owner: req.user._id
    });
    const [latestAttempt] = record.previous_attempts.slice(-1);
    latestAttempt.submission_date = new Date();
    latestAttempt.grade = grade;
    latestAttempt.total_mark = totalMark;
    latestAttempt.view = req.body.answers;
    record.markModified("previous_attempts");
    await record.save();
    res.send("Answers were submitted");
  } catch {
    res.status(500).send("Internal Server Error");
  }
};
