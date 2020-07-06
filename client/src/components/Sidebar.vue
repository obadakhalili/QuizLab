<template>
  <b-sidebar
    id="sidebar-backdrop"
    backdrop-variant="dark"
    backdrop
    shadow
    header-class="ml-5"
    :title="name"
  >
    <b-avatar :text="initials" src="/api/user/avatar" class="avatar"></b-avatar>
    <ul class="list-unstyled mt-3">
      <router-link to="/dashboard">
        <li>
          <h6>Dashboard</h6>
        </li>
      </router-link>
      <router-link to="/account">
        <li>
          <h6>Account</h6>
        </li>
      </router-link>
      <li>
        <h6>My Quizzes</h6>
      </li>
      <li>
        <h6>Report</h6>
      </li>
      <li @click="logout">
        <h6>Sign out</h6>
      </li>
    </ul>
  </b-sidebar>
</template>

<script>
import API from "@/api";

export default {
  name: "Sidebar",
  props: ["name"],
  computed: {
    initials() {
      return this.name[0] + this.name.split(" ")[1][0];
    }
  },
  methods: {
    async logout() {
      await API("/user/logout", "get");
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.avatar {
  position: absolute;
  top: 6px;
  left: 8px;
}

ul li {
  padding: 15px 20px 13px 20px;
}

ul li:hover {
  background-color: #a8a8a8;
  cursor: pointer;
}

a {
  color: #343a40 !important;
  text-decoration: none;
}
</style>
