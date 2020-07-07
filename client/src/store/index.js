import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import alerts from "./modules/alerts.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    alerts
  }
});
