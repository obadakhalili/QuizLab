<template>
  <b-navbar type="dark" class="navbar">
    <b-navbar-brand class="text-white">{{ firstname }}</b-navbar-brand>
    <a class="ml-auto">
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
.navbar {
  background-color: #16191e;
}
h1 {
  color: white;
  position: relative;
  top: 7px;
}
</style>
