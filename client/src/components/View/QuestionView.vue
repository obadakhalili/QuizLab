<template>
  <div class="question-view-container">
    <p>{{ question.title }}</p>
    <b-form-group v-if="question.choices" :label="choicesLabel">
      <b-form-checkbox-group
        v-if="question.isMultipleAnswer"
        v-model="question.selected"
        :options="question.choices"
        text-field="title"
        value-field="id"
        stacked
      >
      </b-form-checkbox-group>
      <b-form-radio-group
        v-else
        v-model="question.selected"
        :options="question.choices"
        text-field="title"
        value-field="id"
        stacked
      >
      </b-form-radio-group>
    </b-form-group>
    <template v-else>
      <label>Write your answer</label>
      <b-textarea
        v-model="question.solution"
        placeholder="Your answer ..."
        rows="3"
        class="mb-3"
      ></b-textarea>
    </template>
    <button
      v-if="thereIsNext"
      @click="$emit('view-next-question')"
      class="btn btn-sm next-btn text-white"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "QuestionView",
  props: ["question", "thereIsNext"],
  computed: {
    choicesLabel() {
      return (
        "Select the correct choice" + (this.question.isMultipleAnswer ? "s" : "")
      );
    }
  }
};
</script>

<style scoped>
.question-view-container {
  background-color: #e9e9e9;
  padding: 10px 15px;
}
.next-btn {
  background-color: #4e6b9f;
}
.next-btn:hover {
  background-color: #3d547d;
}
</style>
