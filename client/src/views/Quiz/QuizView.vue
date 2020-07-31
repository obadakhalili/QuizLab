<template>
  <h1>QuizView</h1>
</template>

<script>
import API from "@/api";

export default {
  async beforeCreate() {
    try {
      const response = await API("/records", "post", {
        quizID: "5f2320a61478a71e5467d3d9",
        entranceDate: new Date()
      });
      console.log(response);
    } catch (e) {
      console.log(e.response);
    }
  }
};
</script>
