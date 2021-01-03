const { Schema, model } = require("mongoose");
const { parse } = require("flatted");

const recordSchema = new Schema({
  previous_attempts: [{ type: Object }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz" }
});

recordSchema.statics.gradeAttempt = reqBody => {
  const review = parse(reqBody.attemptReview);
  let attemptGrade = 0;
  const grade = context => {
    if (context.content) {
      context.content.forEach(grade);
    } else {
      const questionGrade = Number(context.grade);
      attemptGrade += questionGrade ? questionGrade : 0;
    }
  };
  grade(review);
  return attemptGrade;
};

recordSchema.methods.toJSON = function () {
  const recordObject = this.toObject();
  recordObject.previous_attempts.forEach(attempt => {
    attempt.review = undefined;
    attempt.id = undefined;
    if (recordObject.quiz && !recordObject.quiz.show_results) {
      attempt.grade = undefined;
      attempt.total_mark = undefined;
    }
  });
  if (recordObject.quiz) {
    recordObject.quiz.show_results = undefined;
    recordObject.quiz._id = undefined;
    if (recordObject.quiz.owner) {
      recordObject.quiz.owner._id = undefined;
    }
  }
  recordObject.owner._id = undefined;
  recordObject.__v = undefined;
  return recordObject;
};

module.exports = new model("Record", recordSchema);
