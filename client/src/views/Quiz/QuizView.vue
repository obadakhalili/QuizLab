<template>
  <h1>QuizView</h1>
</template>

<script>
import API from "@/api";

export default {
  async beforeCreate() {
    try {
      const response = await API("/records", "post", { quizID: this.$route.params.id });
      console.log(response);
    } catch (e) {
      console.log(e.response);
    }
  }
};
</script>
