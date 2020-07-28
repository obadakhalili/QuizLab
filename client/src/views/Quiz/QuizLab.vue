<template>
  <div class="lab mx-auto">
    <div v-if="!labContent" class="text-center my-5">
      <b-spinner class="align-middle mr-2"></b-spinner>
      <strong>Loading ...</strong>
    </div>
    <div v-else>
      <b-form-group label="Quiz Options:">
        <b-form-checkbox v-model="labContent.options.shuffledQuiz">
          Shuffle questions. Questions from different sections won't be mixed
          up.
        </b-form-checkbox>
        <b-form-checkbox v-model="labContent.options.showQuizResults">
          Show quiz results.
        </b-form-checkbox>
        <b-form-checkbox v-model="labContent.options.blockQuestionAfterAnswer">
          Block question after answer.
        </b-form-checkbox>
        <b-form-checkbox v-model="labContent.options.quizTime.isOpen">
          Open quiz, quiz can be attended any date at any time.
        </b-form-checkbox>
        <b-form-group v-if="!labContent.options.quizTime.isOpen">
          Quiz ending date
          <b-datepicker
            v-model="labContent.options.quizTime.date"
            :placeholder="labContent.options.quizTime.date"
            size="sm"
            class="my-2 w-75"
          ></b-datepicker>
          <b-form-timepicker
            v-model="labContent.options.quizTime.time"
            :placeholder="labContent.options.quizTime.time"
            size="sm"
            class="w-75"
          ></b-form-timepicker>
        </b-form-group>
        <b-row no-gutters>
          <b-col sm="2">
            Allowed attempts
          </b-col>
          <b-col sm="3">
            <b-input
              v-model="labContent.options.allowedAttempts"
              type="number"
              size="sm"
            ></b-input>
          </b-col>
        </b-row>
      </b-form-group>
      <LabContent :labContent="labContent" />
      <b-button
        @click="submitQuiz"
        :variant="routeIsNew ? 'dark' : 'success'"
        class="float-right mt-3 mb-3"
      >
        Submit
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
          showQuizResults: true,
          blockQuestionAfterAnswer: false,
          quizTime: {
            isOpen: false,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
          },
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
      labContent: null
    };
  },
  computed: {
    routeIsNew() {
      return this.$route.path === "/new";
    }
  },
  methods: {
    async setQuiz() {
      try {
        const response = await API(
          "/quizzes/labcontent/" + this.$route.params.id,
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
    async submitQuiz() {
      try {
        if (this.routeIsNew) {
          await API("/quizzes", "post", {
            labContent: stringify(this.labContent)
          });
          this.$store.dispatch("updateAlerts", {
            message: "Quiz was submitted successfully",
            color: "success"
          });
          this.clearContentTitles(this.labContent.mainSection);
        } else {
          const response = await API(
            "/quizzes/" + this.$route.params.id,
            "patch",
            { labContent: stringify(this.labContent) }
          );
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
    }
  },
  components: {
    LabContent: () => import("@/components/Quiz/LabContent/Content")
  }
};
</script>

<style scoped>
.lab {
  max-width: 900px;
}
</style>
