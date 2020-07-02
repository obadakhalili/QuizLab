import Vue from "vue";
import Vuex from "vuex";
import alerts from "./modules/alerts.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alerts
  }
});
