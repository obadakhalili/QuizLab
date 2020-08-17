<template>
  <div>
    <b-table-simple
      v-if="records"
      hover
      small
      responsive
      bordered
      caption-top
      class="text-center"
    >
      <caption>
        {{ isMyRecordsTable ? "Previous Attempts" : "Quiz results" }}
        <template v-if="!records.length">(Nothing to show)</template>
      </caption>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th v-if="isMyRecordsTable">Quiz</b-th>
          <b-th>{{ isMyRecordsTable ? "Quiz by" : "Attempt by" }}</b-th>
          <b-th colspan="6">Attempts Summary</b-th>
        </b-tr>
        <b-tr>
          <b-th :colspan="isMyRecordsTable ? 2 : 1"></b-th>
          <b-th>Started on</b-th>
          <b-th>Submission Date</b-th>
          <b-th>Time Taken</b-th>
          <b-th>Grade</b-th>
          <b-th>Review</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <template v-for="record in records">
          <b-tr
            v-for="(attempt, index) in record.previous_attempts"
            :key="record._id + index"
          >
            <template v-if="record.quiz">
              <b-th
                v-if="isMyRecordsTable && index === 0"
                :rowspan="record.previous_attempts.length"
              >
                {{ record.quiz.title }}
              </b-th>
              <b-th
                v-if="index === 0"
                :rowspan="record.previous_attempts.length"
              >
                <template v-if="isMyRecordsTable">
                  <template v-if="record.quiz.owner">
                    {{ record.quiz.owner.name }}
                  </template>
                  <span v-else class="text-muted">
                    [ACCOUNT DELETED]
                  </span>
                </template>
                <template v-else>
                  <template v-if="record.owner">
                    {{ record.owner.name }}
                  </template>
                  <span v-else class="text-muted">
                    [ACCOUNT DELETED]
                  </span>
                </template>
              </b-th>
            </template>
            <template v-else>
              <b-th
                v-if="index === 0"
                :rowspan="record.previous_attempts.length"
                :colspan="isMyRecordsTable ? 2 : 1"
              >
                <span class="text-muted">
                  [DELETED]
                </span>
                <small>
                  Review is still available
                </small>
              </b-th>
            </template>
            <b-td>{{ humanizeDate(attempt.start_date) }}</b-td>
            <template v-if="attempt.submission_date">
              <b-td>{{ humanizeDate(attempt.submission_date) }}</b-td>
              <b-td>
                {{
                  computeTimeTaken(attempt.submission_date, attempt.start_date)
                }}
              </b-td>
              <template v-if="attempt.grade !== undefined">
                <b-td
                  :variant="computeVariant(attempt, record.quiz)"
                  v-b-tooltip.hover
                  :title="attempt.fully_graded ? undefined : 'Not fully graded'"
                >
                  {{ attempt.grade + "/" + attempt.total_mark }}
                </b-td>
                <b-td>
                  <router-link :to="'/review/' + record._id + '/' + index">
                    <a :href="'/review/' + record._id + '/' + index">Review</a>
                  </router-link>
                </b-td>
              </template>
              <template v-else>
                <b-td colspan="2" class="text-muted">Not Permited</b-td>
              </template>
            </template>
            <b-td v-else variant="secondary" colspan="4">Not Complete</b-td>
          </b-tr>
        </template>
      </b-tbody>
    </b-table-simple>
    <ContentLoading v-else />
  </div>
</template>

<script>
import ContentLoading from "./ContentLoading";
import API from "@/api";

export default {
  name: "PreviousAttempts",
  async created() {
    if (this.isMyRecordsTable) {
      this.records = (await API("/records/my-records", "get")).data;
    } else {
      try {
        this.records = (await API("/records/my-quiz-records", "get", {
          headers: { quizID: this.$route.params.id }
        })).data;
      } catch (e) {
        this.$router.push("/quizzes");
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      }
    }
  },
  data() {
    return {
      records: null,
      quizTitle: ""
    };
  },
  methods: {
    humanizeDate(date) {
      return new Date(date).toLocaleString();
    },
    computeTimeTaken(endDate, startDate) {
      const diff = new Date(endDate) - new Date(startDate);
      const hours = Math.trunc(diff / 3600000);
      const minutes = Math.trunc((diff % 3600000) / 60000);
      const seconds = Math.trunc((diff % 60000) / 1000);
      const formatted =
        (hours
          ? hours +
            " hr" +
            (hours > 1 ? "s" : "") +
            (minutes || seconds ? ", " : "")
          : "") +
        (minutes
          ? minutes + " min" + (minutes > 1 ? "s" : "") + (seconds ? ", " : "")
          : "") +
        (seconds
          ? seconds + " sec" + (seconds > 1 || seconds === 0 ? "s" : "")
          : "");
      return formatted ? formatted : "0 secs";
    },
    computeVariant(attempt, quiz) {
      if (!attempt.fully_graded) {
        return "warning";
      } else if (!quiz || quiz.pass_grade === null) {
        return "";
      } else if (attempt.grade >= quiz.pass_grade) {
        return "success";
      }
      return "danger";
    }
  },
  computed: {
    isMyRecordsTable() {
      return this.$route.path === "/quizzes";
    }
  },
  components: {
    ContentLoading: ContentLoading
  }
};
</script>
