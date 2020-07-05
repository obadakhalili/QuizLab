<template>
  <b-navbar type="dark" variant="dark" class="mb-2">
    <b-navbar-brand href="#">{{ firstname }}</b-navbar-brand>
    <a href="#" class="ml-auto">
      <font-awesome-icon
        :icon="['fas', 'bars']"
        color="white"
        size="2x"
        v-b-toggle.sidebar-backdrop
      />
    </a>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: ["firstname"]
};
</script>
