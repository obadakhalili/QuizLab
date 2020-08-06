<template>
  <h1>QuizView</h1>
</template>

<script>
import { parse } from "flatted";
import API from "@/api";

export default {
  async beforeCreate() {
    try {
      const response = await API("/records", "post", {
        quizID: this.$route.params.id
      });
      if (response.status === 201) {
        throw { response, color: "info" };
      }
      this.viewContent = parse(response.data.viewContent);
      if (response.data.leftTimeLimit) {
        setTimeout(
          () => (this.thereIsTimeLeftForSubmit = false),
          response.data.leftTimeLimit
        );
      }
    } catch (e) {
      this.$router.push("/quizzes");
      return this.$store.dispatch("updateAlerts", {
        message: e.response.data,
        color: e.color || "danger"
      });
    }
  },
  data() {
    return {
      viewContent: null,
      thereIsTimeLeftForSubmit: true
    };
  }
};
</script>
