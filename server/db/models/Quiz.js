const { Schema, model } = require("mongoose");
const { parse, stringify } = require("flatted");

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"]
    },
    allowed_attempts: {
      type: Number,
      required: [true, "Quiz allowed attempts option is required"],
      validate: {
        validator(v) {
          return Number.isInteger(v) && v > 0;
        },
        message: "Allowed attempts should be an integer greater than 0"
      }
    },
    time_limit: {
      type: Number,
      min: [0, "Time limit should be an integer thats at least 0"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    close_date: {
      type: Date,
      validate: {
        validator(v) {
          return v > this.start_date;
        },
        message: "Close date should be greater than start date"
      }
    },
    start_date: Date,
    show_results: Boolean,
    block_after_answer: Boolean,
    shuffle_quiz: Boolean,
    lab_content: String,
    view_content: String,
    pass_grade: Number
  },
  { timestamps: true }
);

class QuizMethods {
  createViewContent() {
    const { lab_content } = this;
    const { mainSection: viewContent } = parse(lab_content);
    const removeCorrectProperty = context => {
      if (context.choices) {
        context.choices.forEach(choice => delete choice.correct);
      } else if (context.content) {
        context.content.forEach(removeCorrectProperty);
      }
    };
    viewContent.content.forEach(removeCorrectProperty);
    return stringify(viewContent);
  }
  shuffleQuiz() {
    const { view_content } = this;
    const viewContent = parse(view_content);
    const shuffleArray = array => {
      let current = array.length,
        randomIndex,
        tempVal;
      while (current) {
        randomIndex = Math.floor(Math.random() * current--);
        tempVal = array[current];
        array[current] = array[randomIndex];
        array[randomIndex] = tempVal;
      }
      return array;
    };
    const shuffleContent = content => {
      shuffleArray(content);
      content.forEach(context => {
        if (context.content) {
          shuffleContent(context.content);
        } else if (context.choices) {
          shuffleArray(context.choices);
        }
      });
    };
    shuffleContent(viewContent.content);
    return stringify(viewContent);
  }
  gradeAnswers(answers) {
    let grade = 0,
      totalMark = 0;
    const { lab_content } = this;
    const labContent = parse(lab_content);
    answers = parse(answers);
    const getOriginalQuestion = path => {
      let currentContent = labContent.mainSection.content;
      path.forEach(id => {
        const context = currentContent.find(context => context.id === id);
        currentContent = context.content ? context.content : context;
      });
      return currentContent;
    };
    const generatePath = (context, path) => {
      if (!context.parentSection) {
        return path;
      }
      path.unshift(context.id);
      return generatePath(context.parentSection, path);
    };
    const markQuestion = question => {
      const path = generatePath(question, []);
      const originalQuestion = getOriginalQuestion(path);
      const weight = Number(originalQuestion.weight);
      if (typeof question.selected === "number") {
        const correctAnswer = originalQuestion.choices.find(
          choice => choice.correct
        ).id;
        if (question.selected === correctAnswer) {
          grade += weight ? weight : 0;
        }
        totalMark += question.isBonus ? 0 : weight;
      } else if (question.selected?.constructor === Array) {
        const selectedAnswers = question.selected.sort();
        const correctAnswers = originalQuestion.choices
          .reduce(
            (array, choice) => (choice.correct ? [...array, choice.id] : array),
            []
          )
          .sort();
        if (
          correctAnswers.every((id, index) => id === selectedAnswers[index])
        ) {
          grade += weight ? weight : 0;
        }
        totalMark += question.isBonus ? 0 : weight;
      } else {
        totalMark += question.isBonus ? 0 : weight;
      }
    };
    const markContent = content => {
      content.forEach(context => {
        if (context.weight) {
          markQuestion(context);
        } else if (context.content) {
          markContent(context.content);
        }
      });
    };
    markContent(answers.content);
    return {
      grade,
      totalMark
    };
  }
  toJSON() {
    const quizObject = this.toObject();
    quizObject.__v = undefined;
    quizObject.show_results = undefined;
    quizObject.block_after_answer = undefined;
    quizObject.shuffle_quiz = undefined;
    quizObject.allowed_attempts = undefined;
    quizObject.owner = undefined;
    quizObject.lab_content = undefined;
    quizObject.view_content = undefined;
    quizObject.start_date = undefined;
    quizObject.close_date = undefined;
    quizObject.time_limit = undefined;
    return quizObject;
  }
}

quizSchema.loadClass(QuizMethods);

module.exports = new model("Quiz", quizSchema);
