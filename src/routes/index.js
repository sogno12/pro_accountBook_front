import Vue from "vue";
import Router from "vue-router";
import { UP_PAGE } from "@/js/const";

Vue.use(Router);

const routes = [
  {
    path: UP_PAGE.MAIN,
    name: "home",
    component: () => import("@/views/Login"),
  },
  {
    path: UP_PAGE.LOGIN,
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: UP_PAGE.REGISTER,
    name: "Register",
    component: () => import("@/views/Register"),
  },
];

export default new Router({
  mode: "history",
  base: process.env.APP_BASE_URL,
  routes: routes,
});
