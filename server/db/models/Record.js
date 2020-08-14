const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  previous_attempts: [{ type: Object }],
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  }
});

recordSchema.methods.toJSON = function () {
  const recordObject = this.toObject();
  recordObject.previous_attempts.forEach(attempt => {
    if (!recordObject.quiz.show_results) {
      attempt.grade = undefined;
      attempt.total_mark = undefined;
    }
    attempt.view = undefined;
  });
  recordObject.quiz.show_results = undefined;
  recordObject.quiz._id = undefined;
  recordObject.owner = undefined;
  recordObject.__v = undefined;
  return recordObject;
};

module.exports = new mongoose.model("Record", recordSchema);
