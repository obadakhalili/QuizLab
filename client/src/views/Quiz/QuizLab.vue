<template>
  <div v-if="labContent" class="lab mt-5 mx-auto">
    <h1 class="display-4 mb-5 text-center">The Lab</h1>
    <b-form-group label="Exam Options:">
      <b-form-checkbox v-model="labContent.options.shuffled">
        Shuffled
      </b-form-checkbox>
      <b-form-checkbox v-model="labContent.options.accessed">
        Access Open
      </b-form-checkbox>
      <b-form-checkbox v-model="labContent.options.blocked">
        Blocked
      </b-form-checkbox>
    </b-form-group>
    <LabContent :labContent="labContent" />
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
      this.labContent = {};
      this.labContent.options = {
        shuffled: true,
        "access-open": true,
        blocked: false
        // etc ...
      };
      this.labContent.mainSection = {
        title: "",
        content: []
      };
    } else {
      this.setQuiz();
    }
  },
  data() {
    return {
      labContent: null
    };
  },
  computed: {
    routeIsNew() {
      return this.$route.path === "/new";
    },
    IDParam() {
      return this.$route.params.id;
    }
  },
  methods: {
    async setQuiz() {
      try {
        const response = await API("/quizzes/labcontent/" + this.IDParam, "get");
        this.labContent = parse(response.data);
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
        await API("/quizzes", "post", {
          title: this.labContent.mainSection.title,
          lab_content: stringify(this.labContent)
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
        const response = await API("/quizzes/" + this.IDParam, "patch", {
          title: this.labContent.mainSection.title,
          labContent: stringify(this.labContent)
        });
        if (response.data.quizIsModified) {
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
    }
  },
  components: {
    LabContent: () => import("@/components/Quiz/LabContent")
  }
};
</script>

<style scoped>
.lab {
  max-width: 900px;
}
.submit-btn {
  background-color: #343a40;
}
</style>
