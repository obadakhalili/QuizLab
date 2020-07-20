<template>
  <div>
    <div class="header">
      <b-row>
        <b-col cols="md-8">
          <router-link to="/new">
            <b-button size="sm" variant="secondary">
              Create New Quiz
            </b-button>
          </router-link>
        </b-col>
        <b-col cols="md-4">
          <b-form-row class="attend-quiz-section">
            <b-col cols="8">
              <b-input size="sm" placeholder="Enter Quiz ID"></b-input>
            </b-col>
            <b-col cols="4">
              <b-button size="sm" variant="primary" class="w-100">
                Attend
              </b-button>
            </b-col>
          </b-form-row>
        </b-col>
      </b-row>
    </div>
    <b-table :items="myQuizzes" :busy="myQuizzesAreBusy" small class="mt-5">
      <template v-slot:table-busy>
        <div class="text-center my-5">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Loading ...</strong>
        </div>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="gotoLab(row.id)" class="mr-1">
          Edit
        </b-button>
        <b-button size="sm" @click="deleteQuiz(row.id)">
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import API from "@/api";

export default {
  name: "QuizzesDashboard",
  async created() {
    const response = await API("/quiz", "get");
    this.myQuizzes = response.data;
    this.myQuizzesAreBusy = false;
  },
  data() {
    return {
      myQuizzes: [],
      myQuizzesAreBusy: true
    };
  }
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #cecece;
  padding-bottom: 5px;
}
@media only screen and (max-width: 767px) {
  .attend-quiz-section {
    margin-top: 5px;
  }
}
</style>
