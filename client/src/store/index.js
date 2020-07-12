import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import alerts from "./modules/alerts";
import confirmModal from "./modules/confirm-modal";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    alerts,
    confirmModal
  }
});
