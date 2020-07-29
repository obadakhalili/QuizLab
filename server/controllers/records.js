const Record = require("../db/models/Record.js");
const Quiz = require("../db/models/Quiz.js");

exports.checkRecord = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.body.quizID }, {
      allowed_attempts: true,
      start_date: true,
      close_date: true,
      time_limit: true,
      _id: false
    });
    if (!quiz) {
      return res.send("Quiz not found");
    }
    let record = await Record.findOne({
      quiz: req.body.quizID,
      owner: req.user._id
    });
    req.body.entranceDate = new Date(req.body.entranceDate);
    if (quiz.start_date) {
      if (req.body.entranceDate < quiz.start_date) {
        return res.send("You are early, exam starts at " + quiz.start_date.toLocaleString());
      } else if (req.body.entranceDate > quiz.close_date) {
        return res.send("You are late, exam ended at " + quiz.close_date.toLocaleString());
      }
    }
    if (record) {
      if (!record.left_attempts) {
        return res.send("You are out of attempts");
      } else {
        record.left_attempts--;
      }
    } else {
      record = new Record({ left_attempts: --quiz.allowed_attempts, quiz: req.body.quizID, owner: req.user._id });
    }
    await record.save();
    let leftTimeLimit;
    if (quiz.time_limit !== undefined) {
      const difference = (quiz.close_date - req.body.entranceDate) / (1000 * 60);
      if (difference > quiz.time_limit) {
        leftTimeLimit = quiz.time_limit;
      } else {
        leftTimeLimit = difference
      }
    } else {
      leftTimeLimit = undefined;
    }
    res.json({
      leftTimeLimit,
      quizView: "..."
    });
  } catch (e) {
    if (e.name === "CastError") {
      res.status(400).send("Wrong quiz ID format");
    } else {
      res.status(500).end();
    }
  }
};
