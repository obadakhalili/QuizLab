<template>
  <div>
    <DashboardHeader />
    <MyQuizzes class="mt-4" />
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
