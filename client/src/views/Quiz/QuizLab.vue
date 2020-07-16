<template>
  <div v-if="quiz" class="lab mt-5 mx-auto">
    <QuizContent :quiz="quiz" />
    <b-button @click="submitQuiz" class="submit-btn float-right mt-3 mb-3">
      <template>
        {{ routeIsNew ? "Submit Quiz" : "Update Quiz" }}
      </template>
    </b-button>
  </div>
</template>

<script>
import { parse, stringify } from "flatted";
import API from "@/api";

export default {
  name: "QuizLab",
  created() {
    if (this.routeIsNew) {
      this.quiz = {};
      this.quiz.options = {
        shuffled: false,
        blocked: false
        // etc ...
      };
      this.quiz.mainSection = {
        title: "",
        content: []
      };
    } else {
      this.setQuiz();
    }
  },
  data() {
    return {
      quiz: null
    };
  },
  computed: {
    routeIsNew() {
      return this.$route.path === "/lab/new";
    },
    IDParam() {
      return this.$route.params.id;
    }
  },
  methods: {
    async setQuiz() {
      try {
        const response = await API("/quiz/" + this.IDParam, "get");
        this.quiz = parse(response.data.quiz);
      } catch (e) {
        this.$router.push("/dashboard");
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      }
    },
    submitQuiz() {
      this.validateQuiz();
      if (this.routeIsNew) {
        this.insertNewQuiz();
      } else {
        this.updateQuiz();
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
    async updateQuiz() {
      try {
        const { data: { isModified } } = await API("/quiz/" + this.IDParam, "patch", {
          title: this.quiz.mainSection.title,
          quiz: stringify(this.quiz)
        });
        if (isModified) {
          this.$store.dispatch("updateAlerts", {
            message: "Quiz new updates were taken",
            color: "success"
          });
        } else {
          this.$store.dispatch("updateAlerts", {
            message: "No updates made",
            color: "info"
          });
        }
      } catch (e) {
        this.$store.dispatch("updateAlerts", e.response.data.map(message => {
          return {
            message,
            color: "danger"
          };
        }));
      }
    }
  },
  components: {
    QuizContent: () => import("@/components/Quiz/LabContent")
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
