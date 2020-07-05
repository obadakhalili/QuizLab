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
  created() {
    this.name = localStorage.getItem("name") ?? "";
  },
  data() {
    return {
      name: ""
    };
  },
  computed: {
    firstname() {
      return this.name.split(" ")[0];
    }
  },
  components: {
    Sidebar,
    Navbar
  }
};
</script>
