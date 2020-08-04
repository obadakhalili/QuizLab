const { Schema, model } = require("mongoose");

const quizSchema = new Schema(
  {
    lab_content: {
      type: String,
      required: [true, "Quiz is required"],
    },
    title: {
      type: String,
      required: [true, "Quiz title is required"],
    },
    allowed_attempts: {
      type: Number,
      required: [true, "Quiz allowed attempts option is required"],
      validate: {
        validator(v) {
          return Number.isInteger(v) && v > 0;
        },
        message: "Allowed attempts should be an integer greater than 0",
      },
    },
    show_results: {
      type: Boolean,
      required: [true, "Show quiz results option is required"],
    },
    start_date: Date,
    close_date: {
      type: Date,
      validate: {
        validator(v) {
          return v > this.start_date;
        },
        message: "Close date should be greater than start date",
      },
    },
    time_limit: {
      type: Number,
      min: [0, "Time limit should be an integer thats at least 0"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

class QuizMethods {
  toJSON() {
    const quizObject = this.toObject();
    quizObject.__v = undefined;
    quizObject.show_results = undefined;
    quizObject.allowed_attempts = undefined;
    quizObject.owner = undefined;
    quizObject.lab_content = undefined;
    quizObject.start_date = undefined;
    quizObject.close_date = undefined;
    quizObject.time_limit = undefined;
    return quizObject;
  }
}

quizSchema.loadClass(QuizMethods);

module.exports = new model("Quiz", quizSchema);
