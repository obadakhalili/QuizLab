<template>
  <form @submit.prevent="updateAvatar" class="mx-auto">
    <h3>Update Avatar</h3>
    <b-form-file v-model="avatar" class="mt-2 mb-2"></b-form-file>
    <b-button type="submit" variant="secondary">
      <b-spinner v-if="avatarIsUpdating" label="Spinning" small></b-spinner>
      <span v-if="!avatarIsUpdating">Upload</span>
    </b-button>
    <small class="float-right">
      1.5 mb maximum, and .png, .jpg or .jpeg only
    </small>
  </form>
</template>

<script>
import API from "@/api";

export default {
  name: "UpdateAvatarForm",
  data() {
    return {
      avatar: null,
      avatarIsUpdating: false
    };
  },
  methods: {
    async updateAvatar({ submitter }) {
      this.avatarIsUpdating = true;
      submitter.disabled = true;
      const formData = new FormData();
      formData.set("avatar", this.avatar);
      try {
        await API("/user/avatar", "post", formData);
        this.$store.dispatch("updateAlerts", {
          message: "Photo uploaded successfully",
          color: "success"
        });
      } catch (e) {
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      } finally {
        this.avatarIsUpdating = false;
        submitter.disabled = false;
      }
    }
  }
};
</script>
