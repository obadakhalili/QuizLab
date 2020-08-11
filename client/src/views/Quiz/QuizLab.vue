<template>
  <div v-if="labContent" class="lab mx-auto">
    <h5>
      Quiz options
      <small class="noselect">
        <a @click="showQuizOptions = !showQuizOptions">
          {{ showQuizOptions ? "Hide" : "Show" }}
        </a>
      </small>
    </h5>
    <b-form-group v-show="showQuizOptions" class="noselect">
      <b-form-checkbox v-model="labContent.options.shuffleQuiz">
        Shuffle quiz (Shuffle sections order, questions within them and choices
        if any). questions from different sections won't be mixed up.
      </b-form-checkbox>
      <b-form-checkbox v-model="labContent.options.showQuizResults">
        Show quiz results.
      </b-form-checkbox>
      <b-form-checkbox v-model="labContent.options.blockQuestionAfterAnswer">
        Block question after answer.
      </b-form-checkbox>
      <b-form-checkbox v-model="labContent.options.openQuiz">
        Open quiz, quiz can be attended any date at any time.
      </b-form-checkbox>
      <b-form-group v-show="!labContent.options.openQuiz">
        Start date
        <b-datepicker
          v-model="labContent.options.startDate"
          size="sm"
          class="my-2 w-75"
        ></b-datepicker>
        <b-form-timepicker
          v-model="labContent.options.startTime"
          size="sm"
          class="w-75"
        ></b-form-timepicker>
        Close date
        <b-datepicker
          v-model="labContent.options.closeDate"
          size="sm"
          class="my-2 w-75"
        ></b-datepicker>
        <b-form-timepicker
          v-model="labContent.options.closeTime"
          size="sm"
          class="w-75"
        ></b-form-timepicker>
      </b-form-group>
      <b-row no-gutters class="my-2">
        <b-col sm="3">
          Maximum time limit (mins)
        </b-col>
        <b-col sm="9">
          <b-input
            v-model="labContent.options.timeLimit"
            type="number"
            size="sm"
          ></b-input>
          <template v-if="labContent.options.openQuiz">
            <li>If left empty, then no maximum time limit is specified.</li>
          </template>
          <template v-else>
            <label>
              The maximum time limit is set to the duration between start date
              and close date, if:
            </label>
            <li>Input is left empty.</li>
            <li>
              If the maximum time limit input is greater than the duration
              between the start date and close date.
            </li>
          </template>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col sm="3">
          Allowed attempts
        </b-col>
        <b-col sm="9">
          <b-input
            v-model="labContent.options.allowedAttempts"
            type="number"
            size="sm"
            placeholder="required"
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
  <ContentLoading v-else />
</template>

<script>
import { parse, stringify } from "flatted";
import ContentLoading from "@/components/ContentLoading";
import API from "@/api";

export default {
  name: "QuizLab",
  created() {
    if (this.routeIsNew) {
      this.resetLabContent();
    } else {
      this.setQuiz();
    }
  },
  data() {
    return {
      labContent: null,
      showQuizOptions: true
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
      const submitBody = {
        title: this.labContent.mainSection.title,
        options: this.labContent.options,
        labContent: stringify(this.labContent)
      };
      try {
        if (this.routeIsNew) {
          await API("/quizzes", "post", submitBody);
          this.$store.dispatch("updateAlerts", {
            message: "Quiz was submitted successfully",
            color: "success"
          });
          this.resetLabContent();
        } else {
          const response = await API(
            "/quizzes/" + this.$route.params.id,
            "patch",
            submitBody
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
      } finally {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    },
    resetLabContent() {
      this.labContent = {
        options: {
          shuffleQuiz: true,
          showQuizResults: true,
          blockQuestionAfterAnswer: false,
          openQuiz: false,
          startDate: "",
          startTime: "",
          closeDate: "",
          closeTime: "",
          timeLimit: "",
          allowedAttempts: 1
        },
        mainSection: {
          title: "",
          content: []
        }
      };
    }
  },
  components: {
    ContentLoading,
    LabContent: () => import("@/components/Lab/LabContent")
  }
};
</script>

<style scoped>
.lab {
  max-width: 1200px;
}
</style>
