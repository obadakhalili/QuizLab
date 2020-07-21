<template>
  <div id="app">
    <template v-if="routeIsPrivate">
      <Navbar />
      <Sidebar />
      <ConfirmModal />
    </template>
    <b-container>
      <AlertBox
        v-for="(alert, index) in alerts"
        :key="index"
        :index="index"
        :alert="alert"
      />
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlertBox from "./components/AlertBox";
import API from "./api";

export default {
  name: "App",
  computed: {
    ...mapGetters(["alerts"]),
    routeIsPrivate() {
      return this.$route.meta.private ?? false;
    }
  },
  watch: {
    async routeIsPrivate(newRouteIsPrivate) {
      if (newRouteIsPrivate) {
        try {
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
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
