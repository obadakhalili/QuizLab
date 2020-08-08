<template>
  <b-row v-if="viewedSection">
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
          <span @click="changeViewedSection(section)" class="section-path-name">
            {{ nameSection(section.title) }}
          </span>
          <RightArrow
            v-if="!(index === path.length - 1 && !viewedQuestionNumber)"
          />
        </strong>
        <strong v-if="viewedQuestionNumber" class="viewed-question-number">
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
      />
      <b-button variant="dark" size="sm" class="mt-3">Submit Answers</b-button>
    </b-col>
    <b-col lg="8">
      <QuestionView v-if="viewedQuestion" :question="viewedQuestion" />
    </b-col>
    <b-col lg="1">
      Details
    </b-col>
  </b-row>
  <ContentLoading v-else />
</template>

<script>
import { parse } from "flatted";
import ContentLoading from "@/components/ContentLoading";
import API from "@/api";

export default {
  async beforeCreate() {
    try {
      const response = await API("/records", "post", {
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
      timeLimit: null
    };
  },
  computed: {
    path() {
      const path = [];
      const pushToPath = section => {
        path.unshift(section);
        if (section.parentSection) {
          pushToPath(section.parentSection);
        }
      };
      if (this.viewedSection.parentSection) {
        pushToPath(this.viewedSection.parentSection);
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
    }
  },
  methods: {
    changeViewedSection(section) {
      this.viewedSection = section;
      this.viewedQuestion = section.content.find(
        context => context.weight !== undefined
      );
    },
    nameSection(title) {
      if (!title) {
        return "Unnamed section";
      } else if (title === this.quizTitle) {
        return "Main";
      }
      return title;
    },
    submitAnswers() {
      // ..
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
.section-path-name:hover {
  color: #17a2b8;
  cursor: pointer;
}
.viewed-question-number {
  color: #17a2b8;
}
</style>
