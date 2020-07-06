<template>
  <div id="app">
    <Navigators v-if="$router.currentRoute.meta.private" />
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

export default {
  name: "App",
  computed: mapGetters(["alerts"]),
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
