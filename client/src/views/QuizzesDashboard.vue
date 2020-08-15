<template>
  <div>
    <DashboardHeader />
    <MyQuizzes class="my-quizzes-container" />
    <RecordsTable />
  </div>
</template>

<script>
import DashboardHeader from "@/components/QuizzesDashboard/DashboardHeader";
import MyQuizzes from "@/components/QuizzesDashboard/MyQuizzes";
import RecordsTable from "@/components/RecordsTable";

export default {
  name: "Quizzes",
  data() {
    return {
      myRecords: null
    };
  },
  components: {
    MyQuizzes,
    DashboardHeader,
    RecordsTable
  }
};
</script>

<style scoped>
.my-quizzes-container {
  margin: 2rem 0 5rem 0;
}
</style>
