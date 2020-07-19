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
        message: "Are you sure you want to proceed with deleting the account",
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
      this.$bvModal.show("emphasization-modal");
    }
  }
};
</script>
