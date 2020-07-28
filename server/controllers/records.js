const Record = require("../db/models/Record.js");
const Quiz = require("../db/models/Quiz.js");

exports.addRecord = async (req, res) => {
  try {
    if (!req.body.answers) {
      throw "You should add answers";
    }
    const quiz = await Quiz.findOne({ _id: req.body.quizID }, {
      allowedAttempts: true,
      lab_content: true,
      _id: false
    });
    if (!quiz) {
      throw "Quiz not found";
    }
    let record = await Record.findOne({ quiz: req.body.quizID, owner: req.user._id });
    if (record) {
      record.leftAttempts--;
    } else {
      record = new Record({ leftAttempts: --quiz.allowedAttempts, quiz: req.body.quizID, owner: req.user._id });
    }
    record.latestResults.push(10); // check answers and give exam results
    await record.save();
    res.end();
  } catch (e) {
    if (e.name === "CastError") {
      res.status(400).send("Quiz not found")
    } else if (e === "Quiz not found" || e === "You should add answers") {
      res.status(400).send(e);
    } else {
      res.status(500).end();
    }
  }
};
