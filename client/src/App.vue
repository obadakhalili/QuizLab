<template>
  <div id="app">
    <Navigators v-if="routeIsPrivate" />
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
import AlertBox from "./components/AlertBox.vue";
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
          const { data: info } = await API("/user", "get");
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
    Navigators: () => import("./components/Navigators")
  }
};
</script>

<style>
form,
hr {
  max-width: 575px;
}
</style>
