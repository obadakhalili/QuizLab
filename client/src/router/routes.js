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
    component: () => import("@/views/Quizzes/QuizzesDashboard"),
    meta: {
      private: true
    }
  },
  {
    path: "/new",
    component: () => import("@/views/Quizzes/QuizLab"),
    meta: {
      private: true
    }
  },
  {
    path: "*",
    component: () => import("@/views/NotFound")
  }
];
