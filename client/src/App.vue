<template>
  <div id="app">
    <Sidebar v-if="$router.currentRoute.meta.private" />
    <b-container>
      <b-alert
        v-for="({ message, color }, index) in alerts"
        :key="index"
        class="my-3"
        :variant="color"
        show
      >
        {{ message }}
      </b-alert>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  computed: mapGetters(["alerts"]),
  components: {
    Sidebar
  }
};
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 50px auto;
}
</style>
