<template>
  <div>
    <Controllers />
    <MyQuizzes class="mt-5" />
  </div>
</template>

<script>
import Controllers from "@/components/QuizzesDashboard/Controllers";
import MyQuizzes from "@/components/QuizzesDashboard/MyQuizzes";

export default {
  name: "Quizzes",
  components: {
    MyQuizzes,
    Controllers
  }
};
</script>
