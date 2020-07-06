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
    const user = JSON.parse(localStorage.getItem("user"));
    this.firstname = user?.firstname;
    this.lastname = user?.lastname;
  },
  data() {
    return {
      firstname: "",
      lastname: ""
    };
  },
  computed: {
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
