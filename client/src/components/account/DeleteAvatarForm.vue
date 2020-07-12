<template>
  <form @submit.prevent="deleteAvatar" class="mx-auto">
    <h3>Delete Your Avatar</h3>
    <b-button type="submit" variant="danger">Delete</b-button>
  </form>
</template>

<script>
import API from "@/api";

export default {
  name: "DeleteAvatarForm",
  methods: {
    async deleteAvatar() {
      try {
        const { data: message } = await API("/user/avatar", "delete");
        this.$store.dispatch("updateAlerts", {
          message,
          color: "success"
        });
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
