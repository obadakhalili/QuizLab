<template>
  <div>
    <b-row>
      <b-col cols="sm-8">
        <h3>My quizzes</h3>
      </b-col>
      <b-col cols="sm-4">
        <b-button
          @click="confirmDeleteAllQuizzes"
          :disabled="!myQuizzes.length"
          size="sm"
          variant="danger"
          class="delete-all-quizzes-btn"
        >
          Delete All Quizzes
        </b-button>
      </b-col>
    </b-row>
    <b-table
      :fields="myQuizzesFields"
      :items="myQuizzes"
      :busy="myQuizzesAreBusy"
      show-empty
      small
    >
      <template v-slot:table-busy>
        <div class="text-center my-5">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Loading ...</strong>
        </div>
      </template>
      <template v-slot:cell(ID)="data">
        <a
          v-b-tooltip.hover
          title="Copy exam attendance link"
          v-clipboard="'/exam/link/' + data.item._id"
          class="copy-exam-link-link"
        >
          {{ data.item._id }}
        </a>
      </template>
      <template v-slot:cell(actions)="data">
        <router-link :to="'/edit/' + data.item._id">
          <b-button size="sm" variant="success" class="mr-1">
            Edit
          </b-button>
        </router-link>
        <b-button
          @click="confirmDeleteQuiz(data.item._id)"
          size="sm"
          variant="danger"
        >
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import API from "@/api";

export default {
  name: "MyQuizzes",
  async created() {
    const response = await API("/quizzes", "get");
    this.myQuizzes = response.data;
    this.myQuizzesAreBusy = false;
  },
  data() {
    return {
      myQuizzesFields: [
        {
          key: "title",
          label: "Title"
        },
        "ID",
        {
          key: "actions",
          class: 'text-center'
        }
      ],
      myQuizzes: [],
      myQuizzesAreBusy: true
    };
  },
  methods: {
    confirmDeleteQuiz(id) {
      this.$store.dispatch("updateModalInfo", {
        message: "Do you want to continue with deleting this quiz",
        procedure: async () => {
          try {
            await API("/quizzes/" + id, "delete");
            const quizIndex = this.myQuizzes.findIndex(({ _id }) => _id === id);
            this.myQuizzes.splice(quizIndex, 1);
          } catch (e) {
            this.$store.dispatch("updateAlerts", {
              message: e.response.data,
              color: "danger"
            });
          }
        }
      });
      this.$bvModal.show("confirm-modal");
    },
    confirmDeleteAllQuizzes() {
      this.$store.dispatch("updateModalInfo", {
        message:
          "Are you really sure you want to delete all quizzes? Once you press ok, there's no coming back.",
        procedure: async () => {
          await API("/quizzes", "delete");
          this.myQuizzes = [];
        }
      });
      this.$bvModal.show("confirm-modal");
    }
  }
};
</script>

<style scoped>
.delete-all-quizzes-btn {
  float: right;
}
a {
  color: #17a2b8;
  cursor: pointer;
}
@media only screen and (max-width: 575px) {
  a {
    float: none;
    margin-bottom: 5px;
  }
}
</style>
