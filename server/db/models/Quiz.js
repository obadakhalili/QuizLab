const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  quiz: {
    type: String,
    required: [true, "Quiz is required"]
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

class QuizMethods {
  toJSON() {
    const quizObject = this.toObject();
    quizObject._id = undefined;
    quizObject.__v = undefined;
    quizObject.title = undefined;
    return quizObject;
  }
}

quizSchema.loadClass(QuizMethods);

module.exports = new model("Quiz", quizSchema);
