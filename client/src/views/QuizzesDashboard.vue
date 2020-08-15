<template>
  <div>
    <DashboardHeader />
    <MyQuizzes class="my-quizzes-container" />
    <RecordsTable :records="myRecords" />
  </div>
</template>

<script>
import DashboardHeader from "@/components/QuizzesDashboard/DashboardHeader";
import MyQuizzes from "@/components/QuizzesDashboard/MyQuizzes";
import RecordsTable from "@/components/RecordsTable";
import API from "@/api";

export default {
  name: "Quizzes",
  async created() {
    const response = await API("/records/my-records", "get");
    this.myRecords = response.data;
  },
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
