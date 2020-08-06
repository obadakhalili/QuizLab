<template>
  <b-row v-if="viewContent">
    <b-col md="4">
      <b-row>
        <b-col cols="8">
          <label>{{ viewContent.title }}</label>
        </b-col>
        <b-col v-if="timeLimit" cols="4" class="text-right">
          <ViewCounter @timeUp="submitQuiz" :timeLimit="timeLimit" />
        </b-col>
      </b-row>
    </b-col>
    <b-col md="8">
      Quiz View
    </b-col>
  </b-row>
  <ContentLoading v-else />
</template>

<script>
import { parse } from "flatted";
import ContentLoading from "@/components/Quiz/ContentLoading";
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
      this.viewContent = parse(response.data.viewContent);
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
      viewContent: null
    };
  },
  methods: {
    submitQuiz() {
      console.log("Cool!");
    }
  },
  components: {
    ContentLoading,
    ViewCounter: () => import("@/components/Quiz/ViewCounter")
  }
};
</script>
