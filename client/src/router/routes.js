export default [
  {
    path: "/signup",
    component: () => import("@/views/Signup.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      private: true
    }
  },
  {
    path: "/account",
    component: () => import("@/views/Account.vue"),
    meta: {
      private: true
    }
  },
  {
    path: "*",
    component: () => import("@/views/NotFound.vue")
  }
];
