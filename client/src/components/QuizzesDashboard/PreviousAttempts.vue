<template>
  <div>
    <b-table-simple v-if="myRecords" hover small responsive bordered>
      <caption>
        Previous Attempts
        <template v-if="!myRecords.length">(Nothing to show)</template>
      </caption>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Quiz</b-th>
          <b-th colspan="6" class="text-center">Attempts Summary</b-th>
        </b-tr>
        <b-tr class="text-center">
          <b-th></b-th>
          <b-th>Exam by</b-th>
          <b-th>Started on</b-th>
          <b-th>Submission Date</b-th>
          <b-th>Time Taken</b-th>
          <b-th>Grade</b-th>
          <b-th>Review</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <template v-for="record in myRecords">
          <b-tr
            v-for="(attempt, index) in record.previous_attempts"
            :key="index"
            class="text-center"
          >
            <template v-if="record.quiz">
              <b-th
                v-if="index === 0"
                :rowspan="record.previous_attempts.length"
                class="text-left"
              >
                {{ record.quiz.title }}
              </b-th>
              <b-th class="text-muted">
                <!-- This is not necessary since a quiz can't exists without its owner, just in case account was deleted from DB not the UI -->
                {{
                  record.quiz.owner
                    ? record.quiz.owner.name
                    : "[DELETED ACCOUNT]"
                }}
              </b-th>
            </template>
            <template v-else>
              <b-th
                v-if="index === 0"
                :rowspan="record.previous_attempts.length"
                colspan="2"
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
                <b-td>{{ attempt.grade + "/" + attempt.total_mark }}</b-td>
                <b-td><a href="#">Review</a></b-td>
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
import ContentLoading from "../ContentLoading";
import API from "@/api";

export default {
  name: "PreviousAttempts",
  async created() {
    const response = await API("/records", "get");
    this.myRecords = response.data;
  },
  data() {
    return {
      myRecords: null
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
    }
  },
  components: {
    ContentLoading: ContentLoading
  }
};
</script>
