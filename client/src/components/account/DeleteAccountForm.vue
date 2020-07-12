<template>
  <form @submit.prevent="deleteAccount" class="mx-auto mb-3">
    <h3>Delete Your Account</h3>
    <b-button type="submit" variant="danger">Delete</b-button>
  </form>
</template>

<script>
import API from "@/api";
import { startLogoutProcess } from "@/helpers";

export default {
  name: "DeleteAccountForm",
  methods: {
    async deleteAccount() {
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
  }
};
</script>
