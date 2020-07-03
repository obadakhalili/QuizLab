import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import { isAuth } from "@/helpers";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(match => match.path === "*")) {
    next();
  } else {
    if (to.meta.private) {
      if (isAuth()) {
        next();
      } else {
        next("/login");
      }
    } else {
      if (isAuth()) {
        next("/dashboard");
      } else {
        next();
      }
    }
  }
});

export default router;
