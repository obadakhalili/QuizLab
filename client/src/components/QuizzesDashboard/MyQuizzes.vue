<template>
  <div>
    <div>
      <b-row>
        <b-col md="8">
          <b-button
            @click="toggleSelectedQuizzes"
            :disabled="!myQuizzes.length"
            size="sm"
            variant="secondary"
            class="mr-1"
          >
            {{ selectedQuizzesLength > 0 ? "Unselect All" : "Select All" }}
          </b-button>
          <b-button
            @click="confirmDeleteSelectedQuizzes"
            :disabled="selectedQuizzesLength === 0"
            size="sm"
            variant="danger"
          >
            Delete Selected
          </b-button>
        </b-col>
        <b-col md="4">
          <b-pagination
            v-model="currentPage"
            :total-rows="myQuizzesCount"
            :per-page="perPage"
            size="sm"
            class="pagination-bar"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <b-table
      :fields="myQuizzesFields"
      :items="myQuizzes"
      :busy="isBusy"
      :currentPage="currentPage"
      :perPage="perPage"
      :sort-by="fieldToSortWith"
      :sort-desc="sortDesc"
      :filter="filter"
      :filter-included-fields="['title']"
      primary-key="_id"
      stacked="lg"
      show-empty
      small
    >
      <template v-slot:table-caption>
        <b-row>
          <b-col md="8">My Quizzes</b-col>
          <b-col md="4">
            <b-input
              v-model="filter"
              size="sm"
              class="mb-1"
              placeholder="Type to filter"
            ></b-input>
            <b-row class="mb-1">
              <b-col cols="8">
                <b-form-select
                  v-model="fieldToSortWith"
                  :options="sortingOptions"
                  size="sm"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-checkbox v-model="sortDesc" class="mt-1">Desc</b-checkbox>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </template>
      <template v-slot:table-busy>
        <div class="text-center my-5">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Loading ...</strong>
        </div>
      </template>
      <template v-slot:cell(ID)="data">
        <a
          v-b-tooltip.hover
          title="Copy quiz attempt link"
          v-clipboard="getAttemptLink(data.item._id)"
        >
          {{ data.item._id }}
        </a>
      </template>
      <template v-slot:cell(Results)="data">
        <router-link :to="'/results/' + data.item._id">
          <a :href="'/results/' + data.item._id">Results</a>
        </router-link>
      </template>
      <template v-slot:cell(createdAt)="data">
        {{ humanizeDate(data, "createdAt") }}
      </template>
      <template v-slot:cell(updatedAt)="data">
        {{ humanizeDate(data, "updatedAt") }}
      </template>
      <template v-slot:cell(Edit)="data">
        <router-link :to="'/edit/' + data.item._id">
          <a :href="'/edit/' + data.item._id">Go to Lab</a>
        </router-link>
      </template>
      <template v-slot:cell(Selected)="data">
        <b-checkbox v-model="data.item.selected"></b-checkbox>
      </template>
    </b-table>
  </div>
</template>

<script>
import API from "@/api";

export default {
  name: "DashboardHeader",
  async created() {
    const { data: myQuizzes } = await API("/quizzes", "get");
    myQuizzes.forEach(quiz => (quiz.selected = false));
    this.myQuizzesCount = myQuizzes.length;
    this.myQuizzes = myQuizzes;
    this.isBusy = false;
  },
  data() {
    return {
      myQuizzesFields: [
        {
          key: "title"
        },
        "ID",
        "Results",
        {
          key: "createdAt",
          label: "Created At"
        },
        {
          key: "updatedAt",
          label: "Updated At"
        },
        "Edit",
        "Selected"
      ],
      myQuizzes: [],
      myQuizzesCount: 0,
      currentPage: 1,
      perPage: 3,
      filter: "",
      fieldToSortWith: "createdAt",
      sortingOptions: [
        { value: "createdAt", text: "Creation time" },
        { value: "updatedAt", text: "Update time" }
      ],
      sortDesc: true,
      isBusy: true
    };
  },
  computed: {
    selectedQuizzes() {
      return this.myQuizzes.filter(quiz => quiz.selected).map(({ _id }) => _id);
    },
    selectedQuizzesLength() {
      return this.selectedQuizzes.length;
    }
  },
  methods: {
    getAttemptLink(id) {
      return document.location.origin + "/attempt/" + id;
    },
    toggleSelectedQuizzes() {
      if (this.selectedQuizzesLength === 0) {
        this.myQuizzes.forEach(quiz => {
          quiz.selected = true;
        });
      } else {
        this.myQuizzes.forEach(quiz => {
          quiz.selected = false;
        });
      }
    },
    confirmDeleteSelectedQuizzes() {
      if (this.selectedQuizzesLength) {
        this.$store.dispatch("updateModalInfo", {
          message:
            "Are you really sure you want to delete the selected quiz/quizzes? Once you press ok, there's no coming back.",
          procedure: async () => {
            try {
              await API("/quizzes/delete", "post", this.selectedQuizzes);
              this.myQuizzesCount -= this.selectedQuizzesLength;
              this.myQuizzes = this.myQuizzes.filter(
                quiz => !this.selectedQuizzes.includes(quiz._id)
              );
            } catch (e) {
              this.$store.dispatch("updateAlerts", {
                message: e.response.data,
                color: "danger"
              });
            }
          }
        });
        this.$bvModal.show("confirm-modal");
      }
    },
    humanizeDate(data, field) {
      return new Date(data.item[field]).toLocaleString();
    }
  }
};
</script>

<style scoped>
.pagination-bar {
  float: right;
}
@media only screen and (max-width: 767px) {
  .pagination-bar {
    float: none;
    margin-top: 10px;
  }
}
</style>
