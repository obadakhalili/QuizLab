<template>
  <div class="questions-container">
    <label>Questions</label>
    <b-row no-gutters>
      <b-col
        v-for="(question, index) in questions"
        :key="index"
        @click="$emit('change-viewed-question', question)"
        :class="{ selected: question === viewedQuestion }"
        class="question-card noselect text-center py-2 mb-1 mr-1"
        cols="2"
      >
        {{ index + 1 }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "QuesionsNavigator",
  props: ["questions", "viewedQuestion"]
};
</script>

<style scoped>
.questions-container {
  max-height: 500px;
  overflow-y: auto;
}
.question-card {
  background-color: #e9e9e9;
  cursor: pointer;
}
.question-card:hover {
  background-color: #d9d7d7;
}
.question-card.selected {
  background-color: #4e6b9f;
  color: #fff;
}
.question-card.selected:hover {
  background-color: #4e6b9f;
}
</style>
