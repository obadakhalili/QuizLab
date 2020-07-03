export default [
  {
    path: "/dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      private: true
    }
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/signup",
    component: () => import("@/views/Signup.vue")
  },
  {
    path: "*",
    component: () => import("@/views/NotFound.vue")
  }
];
