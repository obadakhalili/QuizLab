import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import routes from "./routes";
import store from "@/store";
import { findCookie } from "@/helpers";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  store.dispatch("updateAlerts", []);
  if (to.matched.some(match => match.path === "*")) {
    next();
  } else {
    const isAuthenticated = findCookie("token-header.payload");
    if (to.meta.private) {
      if (isAuthenticated) {
        axios.defaults.headers.common.pseudorandom = findCookie("pseudorandom");
        next();
      } else {
        next("/login");
      }
    } else {
      if (isAuthenticated) {
        next("/dashboard");
      } else {
        next();
      }
    }
  }
});

export default router;
