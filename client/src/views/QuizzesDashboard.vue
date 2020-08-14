<template>
  <div>
    <DashboardHeader />
    <MyQuizzes class="my-quizzes-container" />
    <PreviousAttempts />
  </div>
</template>

<script>
import DashboardHeader from "@/components/QuizzesDashboard/DashboardHeader";
import MyQuizzes from "@/components/QuizzesDashboard/MyQuizzes";
import PreviousAttempts from "@/components/QuizzesDashboard/PreviousAttempts";

export default {
  name: "Quizzes",
  components: {
    MyQuizzes,
    DashboardHeader,
    PreviousAttempts
  }
};
</script>

<style scoped>
.my-quizzes-container {
  margin: 2rem 0 5rem 0;
}
</style>
