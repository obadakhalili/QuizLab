<template>
  <div class="lab mt-5 mx-auto">
    <QuizContent :quiz="quiz" />
    <b-button @click="submitQuiz" class="submit-btn float-right mt-3 mb-3">
      <template v-if="routeIsNew">
        Submit Quiz
      </template>
      <template v-else>
        Edit Quiz
      </template>
    </b-button>
  </div>
</template>

<script>
import { parse, stringify } from "flatted";
import API from "@/api";
import QuizContent from "@/components/Quiz/QuizContent";

export default {
  name: "QuizLab",
  created() {
    if (this.routeIsNew) {
      this.quiz.options = {
        shuffled: false,
        blocked: false
        // etc ...
      };
      this.quiz.mainSection = {
        title: "",
        content: []
      };
    } else if (this.routeIsEdit) {
      this.setQuiz();
    } else {
      // redirect
    }
  },
  data() {
    return {
      quiz: {}
    };
  },
  computed: {
    routeIsNew() {
      return this.$route.path === "/new";
    },
    routeIsEdit() {
      return this.$route.path === "/edit";
    }
  },
  methods: {
    async setQuiz() {
      // ..
    },
    submitQuiz() {
      this.validateQuiz();
      if (this.routeIsNew) {
        this.insertNewQuiz();
      } else {
        this.editQuiz();
      }
    },
    validateQuiz() {
      // validate quiz
    },
    async insertNewQuiz() {
      try {
        await API("/quiz", "post", {
          title: this.quiz.mainSection.title,
          quiz: stringify(this.quiz)
        });
        this.$store.dispatch("updateAlerts", {
          message: "Quiz was submitted successfully",
          color: "success"
        });
      } catch (e) {
        this.$store.dispatch(
          "updateAlerts",
          e.response.data.map(message => {
            return {
              message,
              color: "danger"
            };
          })
        );
      }
    },
    async editQuiz() {
      // edit quiz
    }
  },
  components: {
    QuizContent
  }
};
</script>

<style scoped>
.lab {
  max-width: 700px;
}
.submit-btn {
  background-color: #343a40;
}
</style>
