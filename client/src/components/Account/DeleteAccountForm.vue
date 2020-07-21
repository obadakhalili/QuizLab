<template>
  <form class="mx-auto">
    <h3>Delete Account</h3>
    <b-button @click="confirm" variant="danger">Delete</b-button>
  </form>
</template>

<script>
import API from "@/api";
import { startLogoutProcess } from "@/helpers";

export default {
  name: "DeleteAccountForm",
  methods: {
    confirm() {
      this.$store.dispatch("updateModalInfo", {
        message: "Please be careful. This is not the usual yada yada, Are you sure you want to proceed with deleting this account?",
        procedure: async () => {
          try {
            await API("/user", "delete");
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
