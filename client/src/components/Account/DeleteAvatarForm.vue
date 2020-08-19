<template>
  <form class="mx-auto">
    <h3>Delete Your Avatar</h3>
    <b-button @click="confirm" variant="danger">Delete</b-button>
  </form>
</template>

<script>
import API from "@/api";

export default {
  name: "DeleteAvatarForm",
  methods: {
    confirm() {
      this.$store.dispatch("updateModalInfo", {
        message: "Are you sure you want to delete your avatar?",
        procedure: async () => {
          try {
            const response = await API("/users/avatar", "delete");
            this.$store.dispatch("updateAlerts", {
              message: response.data,
              color: "success"
            });
            location.reload();
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
