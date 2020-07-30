<template>
  <h1>QuizView</h1>
</template>

<script>
import API from "@/api";

export default {
  async beforeCreate() {
    try {
      const response = await API("/records", "post", {
        quizID: "5f22a8b4b08f4618a479d081",
        entranceDate: new Date()
      });
      console.log(response);
    } catch (e) {
      console.log(e.response);
    }
  }
};
</script>
