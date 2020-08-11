const Record = require("../db/models/Record.js");
const Quiz = require("../db/models/Quiz.js");

exports.checkRecord = async (req, res) => {
  try {
    const quiz = await Quiz.findOne(
      { _id: req.body.quizID },
      {
        view_content: true,
        allowed_attempts: true,
        block_after_answer: true,
        shuffle_quiz: true,
        start_date: true,
        close_date: true,
        time_limit: true,
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
      if (record.taken_attempts >= quiz.allowed_attempts) {
        return res.status(201).send("You are out of attempts");
      }
      record.taken_attempts++;
    } else {
      record = new Record({ quiz: req.body.quizID, owner: req.user._id });
    }
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
    res.status(500).end();
  }
};
