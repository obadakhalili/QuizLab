export default [
  {
    path: "/signup",
    component: () => import("@/views/Signup")
  },
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: "/account",
    component: () => import("@/views/Account"),
    meta: {
      private: true
    }
  },
  {
    path: "/(quizzes|dashboard)",
    component: () => import("@/views/Quiz/QuizzesDashboard"),
    meta: {
      private: true
    }
  },
  {
    path: "/lab/new",
    component: () => import("@/views/Quiz/QuizLab"),
    meta: {
      private: true
    }
  },
  {
    path: "/lab/edit/:id",
    component: () => import("@/views/Quiz/QuizLab"),
    meta: {
      private: true
    }
  },
  {
    path: "*",
    component: () => import("@/views/NotFound")
  }
];
