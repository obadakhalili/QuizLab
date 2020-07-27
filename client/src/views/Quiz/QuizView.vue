<template>
  <b-button @click="submitAnswers">Submit Answers</b-button>
</template>

<script>
import API from "@/api";

export default {
  methods: {
    async submitAnswers() {
      const response = await API("/results", "post", {
        quizID: "5f1db68c1ae34033a01e6418",
        ownerID: "5f173fb8ba140632a8e62182"
      });

      console.log(response);
    }
  }
};
</script>
