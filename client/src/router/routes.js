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
    path: "/quizzes",
    component: () => import("@/views/QuizzesDashboard"),
    meta: {
      private: true
    }
  },
  {
    path: "/new",
    component: () => import("@/views/Quiz/QuizLab"),
    meta: {
      private: true
    }
  },
  {
    path: "/edit/:id",
    component: () => import("@/views/Quiz/QuizLab"),
    meta: {
      private: true
    }
  },
  {
    path: "/quiz/:id",
    component: () => import("@/views/Quiz/QuizView"),
    meta: {
      private: true
    }
  },
  {
    path: "*",
    component: () => import("@/views/NotFound")
  }
];
