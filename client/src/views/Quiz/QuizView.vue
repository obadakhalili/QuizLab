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
      <div v-if="path.length" class="my-2">
        <strong v-for="(section, index) in path" :key="index" class="noselect">
          <span @click="viewedSection = section" class="section-name">
            {{ nameSection(section.title) }}
          </span>
          <RightArrow v-if="index < path.length - 1" />
        </strong>
      </div>
      <SectionNavigator
        @change-viewed-section="
          newViewedSection => (viewedSection = newViewedSection)
        "
        :viewedSection="viewedSection"
      />
    </b-col>
    <b-col lg="8">
      Question View
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
    submitAnswers() {
      // ..
    }
  },
  components: {
    ContentLoading,
    CountdownTimer: () => import("@/components/View/CountdownTimer"),
    SectionNavigator: () => import("@/components/View/SectionNavigator")
  }
};
</script>

<style scoped>
.section-name:hover {
  color: #17a2b8;
  cursor: pointer;
}
</style>
