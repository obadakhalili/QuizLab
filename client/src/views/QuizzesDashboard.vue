<template>
  <div>
    <DashboardHeader />
    <MyQuizzes class="mt-4" />
  </div>
</template>

<script>
import DashboardHeader from "@/components/QuizzesDashboard/DashboardHeader";
import MyQuizzes from "@/components/QuizzesDashboard/MyQuizzes";

export default {
  name: "Quizzes",
  components: {
    MyQuizzes,
    DashboardHeader
  }
};
</script>
