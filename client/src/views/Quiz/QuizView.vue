<template>
  <b-row v-if="quiz">
    <b-col lg="3">
      <b-row>
        <b-col cols="8">
          <h5>{{ quiz.title }}</h5>
        </b-col>
        <b-col v-if="options.timeLimit" cols="4" class="text-right">
          <CountdownTimer
            @timeUp="submitAnswers"
            :timeLimit="options.timeLimit"
          />
        </b-col>
      </b-row>
      <div v-if="path.length" class="noselect my-2">
        <strong v-for="(section, index) in path" :key="index">
          <span
            @click="changeViewedSection(section)"
            class="path--section-name"
          >
            {{ nameSection(section.title) }}
          </span>
          <RightArrow
            v-if="!(index === path.length - 1 && viewedQuestionNumber === 0)"
          />
        </strong>
        <strong
          v-if="viewedQuestionNumber"
          class="path--viewed-question-number"
        >
          {{ viewedQuestionNumber }}
        </strong>
      </div>
      <SectionsNavigator
        @change-viewed-section="changeViewedSection"
        v-if="nestedSections.length"
        :sections="nestedSections"
      />
      <QuestionsNavigator
        @change-viewed-question="question => (viewedQuestion = question)"
        v-if="nestedQuestions.length"
        :questions="nestedQuestions"
        :viewedQuestion="viewedQuestion"
        :blockAfterAnswer="options.blockAfterAnswer"
      />
      <h6 v-if="viewedSection.content.length === 0">
        No sections or questions to show
      </h6>
      <div class="my-3">
        <b-button
          v-if="isAttempt"
          @click="confirmSubmission"
          variant="dark"
          size="sm"
          class="mr-1"
        >
          Submit Answers
        </b-button>
        <b-button
          v-else-if="isAuthor"
          @click="gradeAttempt"
          variant="success"
          size="sm"
          class="mr-1"
          >Grade</b-button
        >
        <router-link to="/quizzes">
          <b-button variant="secondary" size="sm">
            Leave
          </b-button>
        </router-link>
      </div>
    </b-col>
    <b-col lg="9">
      <b-row>
        <b-col cols="10">
          <QuestionView
            @view-next-question="viewNextQuestion"
            v-if="viewedQuestion"
            :question="viewedQuestion"
            :thereIsNext="thereIsNext"
          />
        </b-col>
        <b-col v-if="viewedQuestion" cols="2" class="text-center p-0">
          <div class="question-sidebar">
            <div class="question-details">
              <div class="details--viewed-question-number text-white">
                Q. {{ viewedQuestionNumber }}
              </div>
              <h1 class="display-4 m-0">
                {{ viewedQuestion.weight ? viewedQuestion.weight : 0 }}
              </h1>
              <label>Weight</label>
            </div>
            <div v-if="viewedQuestion.isBonus" class="bonus-question">
              Bonus
            </div>
            <b-input
              v-if="isAuthor"
              v-model="viewedQuestion.grade"
              class="mt-3"
              type="number"
              placeholder="Grade"
            ></b-input>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <ContentLoading v-else />
</template>

<script>
import { parse, stringify } from "flatted";
import ContentLoading from "@/components/ContentLoading";
import API from "@/api";

export default {
  async created() {
    try {
      let view;
      if (this.isAttempt) {
        const response = await API("/records/attempt-quiz", "post", {
          quizID: this.$route.params.id
        });
        if (response.status === 201) {
          throw { response, color: "info" };
        }
        this.options = response.data.options;
        view = response.data.viewContent;
      } else {
        this.confirmLeave = false;
        const { id, index } = this.$route.params;
        const response = await API(
          `/records/attempt-review/${id}/${index}`,
          "get"
        );
        this.isAuthor = response.data.isAuthor;
        view = response.data.attemptView;
      }
      this.quiz = parse(view);
      this.viewedSection = this.quiz;
      this.viewedQuestion = this.nestedQuestions[0];
    } catch (e) {
      this.confirmLeave = false;
      this.$router.push("/quizzes");
      this.$store.dispatch("updateAlerts", {
        message: e.response.data,
        color: e.color || "danger"
      });
    }
  },
  data() {
    return {
      options: {},
      quiz: null,
      viewedSection: null,
      viewedQuestion: null,
      confirmLeave: true,
      isAuthor: false,
      isAttempt: this.$route.path.startsWith("/attempt")
    };
  },
  computed: {
    path() {
      const path = [];
      const addToPath = section => {
        path.unshift(section);
        if (section.parentSection) {
          addToPath(section.parentSection);
        }
      };
      if (this.viewedSection.parentSection) {
        addToPath(this.viewedSection.parentSection);
        path.push(this.viewedSection);
      }
      return path;
    },
    nestedSections() {
      return this.viewedSection.content.filter(context => context.content);
    },
    nestedQuestions() {
      return this.viewedSection.content.filter(
        context => context.weight !== undefined
      );
    },
    viewedQuestionNumber() {
      return (
        this.nestedQuestions.findIndex(
          question => question === this.viewedQuestion
        ) + 1
      );
    },
    thereIsNext() {
      return this.viewedQuestionNumber < this.nestedQuestions.length;
    }
  },
  methods: {
    changeViewedSection(section) {
      this.viewedSection = section;
      this.viewedQuestion = this.nestedQuestions.find(
        question => question.viewed === false
      );
    },
    nameSection(title) {
      if (!title) {
        return "Unnamed section";
      } else if (title === this.quiz.title) {
        return "Main";
      }
      return title;
    },
    viewNextQuestion() {
      this.viewedQuestion.viewed = true;
      this.viewedQuestion = this.nestedQuestions[this.viewedQuestionNumber];
    },
    confirmSubmission() {
      this.$store.dispatch("updateModalInfo", {
        message: "Sure you want to submit answers?",
        procedure: this.submitAnswers
      });
      this.$bvModal.show("confirm-modal");
    },
    async submitAnswers() {
      const response = await API("/records/submit-answers", "post", {
        quizID: this.$route.params.id,
        answers: stringify(this.quiz)
      });
      this.confirmLeave = false;
      this.$router.push("/quizzes");
      this.$store.dispatch("updateAlerts", {
        message: response.data,
        color: response.status === 200 ? "success" : "info"
      });
    },
    async gradeAttempt() {
      try {
        const { id, index } = this.$route.params;
        const response = await API(
          `/records/grade-attempt/${id}/${index}`,
          "post",
          {
            attemptReview: stringify(this.quiz)
          }
        );
        this.$store.dispatch("updateAlerts", {
          message: response.data,
          color: "success"
        });
      } catch (e) {
        this.$router.push("/quizzes");
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.confirmLeave) {
      this.$store.dispatch("updateModalInfo", {
        message: "Do you really want to leave? answers won't be submitted.",
        procedure: next
      });
      this.$bvModal.show("confirm-modal");
    } else {
      next();
    }
  },
  components: {
    ContentLoading,
    CountdownTimer: () => import("@/components/View/CountdownTimer"),
    SectionsNavigator: () => import("@/components/View/SectionsNavigator"),
    QuestionsNavigator: () => import("@/components/View/QuestionsNavigator"),
    QuestionView: () => import("@/components/View/QuestionView")
  }
};
</script>

<style scoped>
.path--section-name:hover {
  color: #17a2b8;
  cursor: pointer;
}
.path--viewed-question-number {
  color: #17a2b8;
}
.question-details {
  background-color: #e9e9e9;
  height: 125px;
}
.details--viewed-question-number {
  background-color: #4e6b9f;
  padding: 2.5px 0;
}
.bonus-question {
  background-color: #81e081;
  padding-bottom: 1px;
}
.question-sidebar {
  width: 85%;
}
</style>
