const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  quiz: {
    type: String,
    required: [true, "Quiz representative is required"]
  },
  title: {
    type: String,
    required: [true, "Quiz title is required"]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = new model("Quiz", quizSchema);
