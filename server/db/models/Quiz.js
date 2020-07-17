const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  lab_content: {
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
    quizObject.__v = undefined;
    quizObject.owner = undefined;
    quizObject.lab_content = undefined;
    return quizObject;
  }
}

quizSchema.loadClass(QuizMethods);

module.exports = new model("Quiz", quizSchema);
