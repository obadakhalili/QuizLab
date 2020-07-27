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
  allowedAttempts: {
    type: Number,
    validate: {
      validator(v) {
        return Number.isInteger(v) && v > 0;
      },
      message: "Allowed attempts should be an integer greater than 0"
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

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
