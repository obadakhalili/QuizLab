<template>
  <div class="question-view-container">
    <p>{{ question.title }}</p>
  </div>
</template>

<script>
export default {
  name: "QuestionView",
  props: ["question"]
};
</script>

<style scoped>
.question-view-container {
  background-color: #fcf9db;
  padding: 10px 15px;
  /* color: #fff; */
}
</style>
