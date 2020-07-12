<template>
  <b-navbar type="dark" variant="dark" class="mb-2">
    <b-navbar-brand href="#">{{ firstname }}</b-navbar-brand>
    <a href="#" class="ml-auto">
      <h1>
        <BIconList v-b-toggle.sidebar-backdrop />
      </h1>
    </a>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    firstname() {
      return this.$store.getters.userField("firstname");
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
  position: relative;
  top: 7px;
}
</style>
