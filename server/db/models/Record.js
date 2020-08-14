const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  previous_attempts: [{ type: Object }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }
});

recordSchema.methods.toJSON = function () {
  const recordObject = this.toObject();
  recordObject.previous_attempts.forEach(attempt => {
    if (recordObject.quiz && !recordObject.quiz.show_results) {
      attempt.grade = undefined;
      attempt.total_mark = undefined;
    }
    attempt.view = undefined;
  });
  if (recordObject.quiz) {
    recordObject.quiz.show_results = undefined;
    recordObject.quiz._id = undefined;
    if (recordObject.quiz.owner) {
      // This is not necessary since a quiz can't exists without its owner, just in case account was deleted from DB not the UI
      recordObject.quiz.owner._id = undefined;
    }
  }
  recordObject.owner._id = undefined;
  recordObject.__v = undefined;
  return recordObject;
};

module.exports = new mongoose.model("Record", recordSchema);
