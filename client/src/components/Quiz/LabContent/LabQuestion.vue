<template>
  <div class="question mt-2 ml-4">
    <button @click="deleteQuestion" type="button" class="close mr-2">
      ×
    </button>
    <b-form-textarea
      v-model="question.title"
      size="sm"
      class="col-10 mb-1"
      placeholder="Question Title"
    ></b-form-textarea>
    <b-input
      v-model="question.weight"
      size="sm"
      type="number"
      class="weight-input"
      placeholder="Weight"
    ></b-input>
    <b-checkbox v-model="question.isBonus" class="noselect">Bonus</b-checkbox>
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
    <label>Select correct choices</label>
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
            v-if="question.choices.length > 2"
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
      const choices = this.question.choices;
      if (!choices) {
        this.question.choices = [
          { title: "" },
          {
            title: "",
            correct: true
          }
        ];
        this.$forceUpdate();
      }
    },
    changeToWrittenSolution() {
      delete this.question.choices;
      this.$forceUpdate();
    },
    changeCorrectness(index) {
      const choices = this.question.choices;
      choices[index].correct = !choices[index].correct;
      this.$forceUpdate();
    },
    addNewChoice() {
      const choices = this.question.choices;
      choices.push({ title: "" });
      this.$forceUpdate();
    },
    deleteChoice(index) {
      const choices = this.question.choices;
      if (choices.length > 2) {
        choices.splice(index, 1);
        if (choices.every(choice => !choice.correct)) {
          choices[0].correct = true;
        }
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style scoped>
.question {
  background-color: #FCF9DB;
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
