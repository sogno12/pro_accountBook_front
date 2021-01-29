import Vue from "vue";
import Router from "vue-router";
import { UP_PAGE } from "@/js/const";

Vue.use(Router);

const routes = [
  {
    path: UP_PAGE.LOGIN,
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: UP_PAGE.REGISTER,
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: UP_PAGE.MAIN,
    name: "Main",
    // beforeEnter: checkAuth,
    component: () => import("@/views/Main.vue"),
    redirect: UP_PAGE.HOME,
    children: [
      {
        path: UP_PAGE.HOME,
        name: "Home",
        // beforeEnter: checkAuth,
        component: () => import("@/views/dashboard/MyDashboard.vue"),
        // meta: {
        //   title: "common.lbl.home",
        // },
      },
    ],
  },
];

export default new Router({
  mode: "history",
  base: process.env.APP_BASE_URL,
  routes: routes,
});
