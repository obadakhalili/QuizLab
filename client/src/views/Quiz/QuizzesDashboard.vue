<template>
  
</template>

<script>
import API from "@/api";

export default {
  name: "QuizzesDashboard",
  async created() {
    const response = await API("/quiz", "get");

    console.log(response);
  },
  data() {
    return {
      
    };
  }
};
</script>
