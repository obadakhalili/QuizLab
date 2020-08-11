<template>
  <b-row v-if="viewedSection" class="mb-5">
    <b-col lg="3">
      <b-row>
        <b-col cols="8">
          <h5>{{ quizTitle }}</h5>
        </b-col>
        <b-col v-if="timeLimit" cols="4" class="text-right">
          <CountdownTimer @timeUp="submitAnswers" :timeLimit="timeLimit" />
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
            v-if="!(index === path.length - 1 && viewedQuestionIndex === -1)"
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
        :blockAfterAnswer="blockAfterAnswer"
      />
      <b-button
        @click="confirmSubmission"
        variant="dark"
        size="sm"
        class="my-3"
      >
        Submit Answers
      </b-button>
    </b-col>
    <b-col lg="8">
      <QuestionView
        @view-next-question="viewNextQuestion"
        v-if="viewedQuestion"
        :question="viewedQuestion"
        :thereIsNext="thereIsNext"
      />
    </b-col>
    <b-col v-if="viewedQuestion" lg="1" class="text-center p-0">
      <div class="question-details-container">
        <div class="details--viewed-question-number text-white">
          Q. {{ viewedQuestionNumber }}
        </div>
        <h1 class="display-4 m-0">
          {{ viewedQuestion.weight ? viewedQuestion.weight : 0 }}
        </h1>
        <label>Weight</label>
      </div>
      <div v-if="viewedQuestion.isBonus" class="details--bonus-question">
        Bonus
      </div>
    </b-col>
  </b-row>
  <ContentLoading v-else />
</template>

<script>
import { parse, stringify } from "flatted";
import ContentLoading from "@/components/ContentLoading";
import API from "@/api";

export default {
  async beforeCreate() {
    try {
      const response = await API("/records/attempt-quiz", "post", {
        quizID: this.$route.params.id
      });
      if (response.status === 201) {
        throw { response, color: "info" };
      }
      this.viewedSection = parse(response.data.viewContent);
      this.viewedQuestion = this.viewedSection.content.find(
        context => context.weight !== undefined
      );
      this.quizTitle = this.viewedSection.title;
      this.blockAfterAnswer = response.data.blockAfterAnswer;
      this.timeLimit = response.data.timeLimit;
    } catch (e) {
      this.$router.push("/quizzes");
      return this.$store.dispatch("updateAlerts", {
        message: e.response.data,
        color: e.color || "danger"
      });
    }
  },
  data() {
    return {
      quizTitle: "",
      viewedSection: null,
      viewedQuestion: null,
      timeLimit: null,
      blockAfterAnswer: false
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
    viewedQuestionIndex() {
      return this.nestedQuestions.findIndex(
        question => question === this.viewedQuestion
      );
    },
    viewedQuestionNumber() {
      return this.viewedQuestionIndex + 1;
    },
    thereIsNext() {
      return this.viewedQuestionNumber < this.nestedQuestions.length;
    }
  },
  methods: {
    nameSection(title) {
      if (!title) {
        return "Unnamed section";
      } else if (title === this.quizTitle) {
        return "Main";
      }
      return title;
    },
    changeViewedSection(section) {
      this.viewedSection = section;
      this.viewedQuestion = section.content.find(
        context => context.weight !== undefined
      );
    },
    viewNextQuestion() {
      this.viewedQuestion = this.nestedQuestions[this.viewedQuestionIndex + 1];
    },
    confirmSubmission() {
      this.$store.dispatch("updateModalInfo", {
        message: "Sure you want to submit answers?",
        procedure: this.submitAnswers
      });
      this.$bvModal.show("confirm-modal");
    },
    async submitAnswers() {
      const response = await API("/records/submit-answers", "post", { answers: stringify(this.viewedSection) });
      console.log(response);
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
.question-details-container {
  background-color: #e9e9e9;
  padding: 0;
  height: 125px;
}
.details--viewed-question-number {
  background-color: #4e6b9f;
  padding: 2.5px 0;
}
.details--bonus-question {
  background-color: #81e081;
  padding-bottom: 1px;
}
</style>
