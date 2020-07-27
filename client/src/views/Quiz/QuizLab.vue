<template>
  <div class="lab mx-auto">
    <h1 class="display-4 text-center">Quizzes Lab</h1>
    <div v-if="!labContent" class="text-center my-5">
      <b-spinner class="align-middle mr-2"></b-spinner>
      <strong>Loading ...</strong>
    </div>
    <div v-else>
      <b-form-group label="Quiz Options:">
        <b-form-checkbox v-model="labContent.options.shuffledQuiz">
          Shuffle questions. Questions from different sections won't be mixed up.
        </b-form-checkbox>
        <b-form-checkbox v-model="labContent.options.ShowQuizResults">
          Show quiz results.
        </b-form-checkbox>
        <b-form-checkbox v-model="labContent.options.blockQuestionAfterAnswer">
          Block question after answer.
        </b-form-checkbox>
        <b-form-checkbox v-model="labContent.options.openQuiz">
          Open quiz, quiz can be attended any date at any time.
        </b-form-checkbox>
        <b-row class="mt-2">
          <b-col lg="2">
            Allowed attempts
          </b-col>
          <b-col lg="2">
            <b-input v-model="labContent.options.allowedAttempts" type="number" size="sm"></b-input>
          </b-col>
        </b-row>
      </b-form-group>
      <LabContent :labContent="labContent" />
      <b-button @click="submitQuiz" class="submit-btn float-right mt-3 mb-3">
        <template>
          {{ routeIsNew ? "Submit Quiz" : "Update Quiz" }}
        </template>
      </b-button>
    </div>
  </div>
</template>

<script>
import { parse, stringify } from "flatted";
import API from "@/api";

export default {
  name: "QuizLab",
  created() {
    if (this.routeIsNew) {
      this.labContent = {
        options: {
          shuffledQuiz: true,
          ShowQuizResults: true,
          blockQuestionAfterAnswer: false,
          openQuiz: false,
          allowedAttempts: 1
        },
        mainSection: {
          title: "",
          content: []
        }
      };
    } else {
      this.setQuiz();
    }
  },
  data() {
    return {
      labContent: null, 
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
        const response = await API(
          "/quizzes/labcontent/" + this.IDParam,
          "get"
        );
        this.labContent = parse(response.data);
      } catch (e) {
        this.$router.push("/quizzes");
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      }
    },
    submitQuiz() {
      if (this.routeIsNew) {
        this.insertNewQuiz();
      } else {
        this.updateQuiz();
      }
    },
    clearContentTitles(context) {
      context.title = "";
      if (context.content) {
        context.content.forEach(this.clearContentTitles);
      } else {
        if (context.choices) {
          context.choices.forEach(this.clearContentTitles);
        }
      }
    },
    async insertNewQuiz() {
      try {
        await API("/quizzes", "post", {
          title: this.labContent.mainSection.title,
          allowedAttempts: this.labContent.options.allowedAttempts,
          lab_content: stringify(this.labContent),
        });
        this.$store.dispatch("updateAlerts", {
          message: "Quiz was submitted successfully",
          color: "success"
        });
        this.clearContentTitles(this.labContent.mainSection);
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
          allowedAttempts: this.labContent.options.allowedAttempts,
          lab_content: stringify(this.labContent)
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
