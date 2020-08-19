import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import alerts from "./modules/alerts";
import confirmModalInfo from "./modules/confirm-modal-info";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    alerts,
    confirmModalInfo
  }
});
