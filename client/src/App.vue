<template>
  <div id="app">
    <Navigators v-if="$router.currentRoute.meta.private" />
    <b-container>
      <b-alert
        v-for="({ message, color }, index) in alerts"
        :key="index"
        :variant="color"
        show
        class="mt-3"
      >
        <button @click="deleteAlert(index)" type="button" class="close">
          ×
        </button>
        {{ message }}
      </b-alert>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  computed: mapGetters(["alerts"]),
  methods: mapActions(["deleteAlert"]),
  components: {
    Navigators: () => import("./components/Navigators.vue")
  }
};
</script>

<style>
form,
hr {
  max-width: 575px;
}
</style>
