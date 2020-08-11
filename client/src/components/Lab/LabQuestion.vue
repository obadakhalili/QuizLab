<template>
  <div class="question mt-2 ml-4">
    <button @click="deleteQuestion" type="button" class="close mr-2">
      ×
    </button>
    <b-form-textarea
      v-model="question.title"
      size="sm"
      class="col-10 mb-1"
      rows="5"
      placeholder="Question Title"
    ></b-form-textarea>
    <b-row>
      <b-col cols="8">
        <b-input
          v-model="question.weight"
          size="sm"
          type="number"
          class="weight-input"
          placeholder="Weight"
        ></b-input>
      </b-col>
      <b-col cols="2">
        <b-checkbox
          v-model="question.isBonus"
          class="noselect float-right mt-1"
        >
          Bonus
        </b-checkbox>
      </b-col>
    </b-row>
    <div class="noselect">
      <small
        @click="changeToMultipleChoice"
        :class="{ 'selected-type-of-question': question.choices }"
        class="mr-2"
      >
        Multiple-Choice
      </small>
      <small
        @click="changeToWrittenSolution"
        :class="{ 'selected-type-of-question': !question.choices }"
      >
        Written Solution
      </small>
    </div>
    <small v-show="question.choices">Select correct choices</small>
    <div v-if="question.choices">
      <b-list-group>
        <b-list-group-item
          v-for="(choice, index) in question.choices"
          :key="index"
          @click="changeCorrectness(index)"
          :variant="choice.correct ? 'secondary' : ''"
          button
        >
          <button
            @click.stop="deleteChoice(index)"
            type="button"
            class="close mr-2"
          >
            ×
          </button>
          <b-input
            @click.stop
            v-model="choice.title"
            size="sm"
            class="col-10"
            placeholder="Choice Title"
          ></b-input>
        </b-list-group-item>
      </b-list-group>
      <b-button @click="addNewChoice" variant="info" class="mt-2 btn-sm">
        Add Choice
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizQuestion",
  props: ["question"],
  methods: {
    deleteQuestion() {
      const parentSectionContent = this.question.parentSection.content;
      const questionIndex = parentSectionContent.findIndex(
        contex => contex === this.question
      );
      parentSectionContent.splice(questionIndex, 1);
      this.$parent.$forceUpdate();
    },
    changeToMultipleChoice() {
      if (!this.question.choices) {
        this.question.choices = [
          {
            title: "",
            id: 0
          },
          {
            title: "",
            id: 1,
            correct: true
          }
        ];
        this.question.isMultipleAnswer = false;
        this.question.selected = null;
        delete this.question.solution;
        this.$forceUpdate();
      }
    },
    changeToWrittenSolution() {
      delete this.question.choices;
      delete this.question.isMultipleAnswer;
      delete this.question.selected;
      this.question.solution = "";
      this.$forceUpdate();
    },
    changeCorrectness(index) {
      const choices = this.question.choices;
      choices[index].correct = !choices[index].correct;
      this.question.isMultipleAnswer = this.isMultipleAnswer();
      this.$forceUpdate();
    },
    addNewChoice() {
      const choices = this.question.choices;
      choices.push({
        title: "",
        id: choices.length
      });
      this.$forceUpdate();
    },
    deleteChoice(index) {
      this.question.choices.splice(index, 1);
      this.question.isMultipleAnswer = this.isMultipleAnswer();
      this.$forceUpdate();
    },
    isMultipleAnswer() {
      return this.question.choices.filter(choice => choice.correct).length > 1;
    }
  }
};
</script>

<style scoped>
.question {
  background-color: #fcf9db;
  padding: 10px 0 10px 15px;
  min-height: 50px;
}
small {
  color: black;
  cursor: pointer;
}
.selected-type-of-question {
  color: #ea6650;
}
.weight-input {
  width: 80px;
}
</style>