<template>
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
</template>

<script>
export default {
  name: "QuizzesDashboard",
  data() {
    return {
      // ..
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
