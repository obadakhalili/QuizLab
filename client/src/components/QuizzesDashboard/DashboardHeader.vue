<template>
  <div class="header">
    <b-row>
      <b-col md="8">
        <router-link to="/new">
          <b-button size="sm" variant="info">
            Create New Quiz
          </b-button>
        </router-link>
      </b-col>
      <b-col md="4">
        <b-form-row class="attend-quiz-section">
          <b-col cols="8">
            <b-input v-model="quizID" size="sm" placeholder="Enter Quiz ID"></b-input>
          </b-col>
          <b-col cols="4">
            <router-link :to="'/quiz/' + this.quizID">
              <b-button size="sm" variant="primary" class="w-100">
                Attend
              </b-button>
            </router-link>
          </b-col>
        </b-form-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Controllers",
  data() {
    return {
      quizID: ""
    };
  }
};
</script>

<style>
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
