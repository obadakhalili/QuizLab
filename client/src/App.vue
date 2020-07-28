<template>
  <div id="app">
    <template v-if="routeIsPrivate">
      <Navbar />
      <Sidebar />
      <ConfirmModal />
    </template>
    <b-container class="mt-4">
      <div class="mb-5">
        <AlertBox
          v-for="(alert, index) in alerts"
          :key="index"
          :index="index"
          :alert="alert"
        />
      </div>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import AlertBox from "./components/AlertBox";
import API from "./api";
import { findCookie } from "./helpers";

export default {
  name: "App",
  computed: {
    ...mapGetters(["alerts"]),
    routeIsPrivate() {
      return this.$route.meta.private;
    }
  },
  watch: {
    async routeIsPrivate(newRouteIsPrivate) {
      if (newRouteIsPrivate) {
        try {
          axios.defaults.headers.common.pseudorandom = findCookie(
            "pseudorandom"
          );
          const { data: info } = await API("/users", "get");
          this.$store.dispatch("updateUserInfo", info);
        } catch ({ response: { data: message } }) {
          this.$store.dispatch("updateAlerts", {
            message,
            color: "danger"
          });
        }
      }
    }
  },
  components: {
    AlertBox,
    Navbar: () => import("./components/Navbar"),
    Sidebar: () => import("./components/Sidebar"),
    ConfirmModal: () => import("./components/ConfirmModal")
  }
};
</script>

<style>
form {
  max-width: 575px;
}
a {
  color: #17a2b8 !important;
  cursor: pointer !important;
}
a:hover {
  color: #343a40 !important;
}
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
