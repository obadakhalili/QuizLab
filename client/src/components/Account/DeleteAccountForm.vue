<template>
  <form class="mx-auto">
    <h3>Delete Account</h3>
    <b-form-group class="noselect">
      <b-checkbox v-model="deleteAccountQuizzes">Delete my quizzes</b-checkbox>
    </b-form-group>
    <b-button @click="confirm" variant="danger">Delete</b-button>
  </form>
</template>

<script>
import API from "@/api";
import { startLogoutProcess } from "@/helpers";

export default {
  name: "DeleteAccountForm",
  data() {
    return {
      deleteAccountQuizzes: false
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("updateModalInfo", {
        message:
          "Please be careful. This is not the usual yada yada, Are you sure you want to proceed with deleting this account?",
        procedure: async () => {
          try {
            await API("/users", "delete", {
              headers: { deleteAccountQuizzes: this.deleteAccountQuizzes }
            });
            startLogoutProcess();
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
  }
};
</script>
