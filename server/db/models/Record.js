const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  previous_attempts: [{ type: Object }],
  quiz: {
    type: mongoose.Schema.Types.ObjectId
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  },
  quiz_title: String,
  show_results: Boolean
});

recordSchema.methods.toJSON = function() {
  const recordObject = this.toObject();
  recordObject.previous_attempts.forEach(attempt => {
    if (!recordObject.show_results) {
      attempt.grade = undefined;
      attempt.total_mark = undefined;
    }
    attempt.view = undefined;
  });
  recordObject.show_results = undefined;
  recordObject.owner = undefined;
  recordObject.quiz = undefined;
  recordObject.__v = undefined;
  return recordObject;
}

module.exports = new mongoose.model("Record", recordSchema);
