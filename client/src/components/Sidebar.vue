<template>
  <b-sidebar
    backdrop-variant="dark"
    backdrop
    shadow
    header-class="ml-5"
    :title="name"
    id="sidebar-backdrop"
  >
    <b-avatar :src="baseRoute + '/users/avatar'" class="avatar"></b-avatar>
    <ul class="list-unstyled mt-3">
      <router-link to="/account">
        <li>
          <h6>Account</h6>
        </li>
      </router-link>
      <router-link to="/quizzes">
        <li>
          <h6>Quizzes</h6>
        </li>
      </router-link>
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
  data() {
    return {
      baseRoute: "/api" + (process.env.NODE_ENV === "development" ? "" : "/v1")
    };
  },
  computed: {
    name() {
      const firstname = this.$store.getters.userField("firstname");
      const lastname = this.$store.getters.userField("lastname");
      return firstname ? `${firstname} ${lastname}` : "";
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
  padding: 12px 20px 8px 20px;
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
