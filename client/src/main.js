import Vue from "vue";
import App from "./App";
import "./plugins/bootstrap";
import "./plugins/v-clipboard";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
