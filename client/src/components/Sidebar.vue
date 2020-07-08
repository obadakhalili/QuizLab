<template>
  <b-sidebar
    id="sidebar-backdrop"
    backdrop-variant="dark"
    backdrop
    shadow
    header-class="ml-5"
    :title="name"
  >
    <b-avatar
      :text="initials"
      :src="baseRoute + '/user/avatar'"
      class="avatar"
    ></b-avatar>
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
      <li @click="startLogoutProcess">
        <h6>Sign out</h6>
      </li>
    </ul>
  </b-sidebar>
</template>

<script>
import { startLogoutProcess } from "@/helpers";

export default {
  name: "Sidebar",
  props: ["name"],
  data() {
    return {
      baseRoute: "/api" + (process.env.NODE_ENV === "development" ? "" : "/v1")
    };
  },
  computed: {
    initials() {
      return this.name[0] + this.name.split(" ")[1][0];
    }
  },
  methods: {
    startLogoutProcess
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
