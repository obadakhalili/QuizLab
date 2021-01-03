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
    close_date: {
      type: Date,
      validate: {
        validator(v) {
          return v > this.start_date;
        },
        message: "Close date should be greater than start date"
      }
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
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
  gradeAnswers(reqBody) {
    let grade = 0,
      totalMark = 0;
    const { lab_content } = this;
    const labContent = parse(lab_content);
    const answers = parse(reqBody.answers);
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
      question.grade = 0;
      if (originalQuestion.isMultipleAnswer) {
        const selectedChoices = question.selected?.sort() || [];
        const correctChoices = originalQuestion.choices
          .reduce(
            (array, choice) => (choice.correct ? [...array, choice.id] : array),
            []
          )
          .sort();
        const answeredCorrectly = correctChoices.every(
          (id, index) => id === selectedChoices[index]
        );
        question.grade = weight && answeredCorrectly ? weight : 0;
        const respectiveCorrectChoices = question.choices.reduce(
          (array, choice) =>
            correctChoices.includes(choice.id) ? [...array, choice] : array,
          []
        );
        respectiveCorrectChoices.forEach(choice => {
          choice.html = `<span class="text-success">${choice.title}<span>`;
          delete choice.title;
        });
      } else if (originalQuestion.isMultipleAnswer === false) {
        let correctChoice = originalQuestion.choices.find(
          choice => choice.correct
        )?.id;
        const answeredCorrectly = question.selected == correctChoice;
        question.grade = weight && answeredCorrectly ? weight : 0;
        const respectiveCorrectChoice = question.choices.find(
          choice => choice.id === correctChoice
        );
        if (respectiveCorrectChoice) {
          respectiveCorrectChoice.html = `<span class="text-success">${respectiveCorrectChoice.title}<span>`;
          delete respectiveCorrectChoice.title;
        }
      }
      grade += question.grade;
      totalMark += question.isBonus ? 0 : weight;
    };
    const markContent = content => {
      content.forEach(context => {
        if (context.weight !== undefined) {
          context.viewed = false;
          markQuestion(context);
        } else if (context.content) {
          markContent(context.content);
        }
      });
    };
    markContent(answers.content);
    return {
      grade,
      totalMark,
      attemptReview: stringify(answers)
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
