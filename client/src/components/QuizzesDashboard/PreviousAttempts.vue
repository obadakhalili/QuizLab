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
          <b-th colspan="5" class="text-center">Attempts Summary</b-th>
        </b-tr>
        <b-tr class="text-center">
          <b-th></b-th>
          <b-th>Start Date</b-th>
          <b-th>Submission Date</b-th>
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
            <b-th
              v-if="index === 0"
              :rowspan="record.previous_attempts.length"
              class="text-left"
            >
              {{ record.quiz_title }}
            </b-th>
            <b-td>{{ humanizeDate(attempt.start_date) }}</b-td>
            <template v-if="attempt.submission_date">
              <b-td>{{ humanizeDate(attempt.submission_date) }}</b-td>
              <template v-if="attempt.grade !== undefined">
                <b-td>{{ attempt.grade + "/" + attempt.total_mark }}</b-td>
                <b-td><a href="#">Review</a></b-td>
              </template>
              <template v-else>
                <b-td colspan="2" class="text-muted">Not Permited</b-td>
              </template>
            </template>
            <b-td v-else variant="secondary" colspan="3">Not Complete</b-td>
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
    }
  },
  components: {
    ContentLoading: ContentLoading
  }
};
</script>
