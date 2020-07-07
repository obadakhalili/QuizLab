<template>
  <div>
    <Sidebar :name="name" />
    <Navbar :firstname="firstname" />
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

export default {
  name: "Navigators",
  computed: {
    firstname() {
      return this.$store.getters.userField("firstname");
    },
    lastname() {
      return this.$store.getters.userField("lastname");
    },
    name() {
      return `${this.firstname} ${this.lastname}`;
    }
  },
  components: {
    Sidebar,
    Navbar
  }
};
</script>
