import Vue from "vue";
import Router from "vue-router";
import store from "@/stores/index";
import { UP_PAGE } from "@/js/const";
import { $checkAuth } from "@/api/auth";

Vue.use(Router);

const routes = [
  {
    path: UP_PAGE.LOGIN,
    name: "Login",
    beforeEnter: isSigned,
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
    beforeEnter: checkAuth,
    component: () => import("@/views/Main.vue"),
    redirect: UP_PAGE.HOME,
    children: [
      {
        path: UP_PAGE.HOME,
        name: "Home",
        beforeEnter: checkAuth,
        component: () => import("@/views/dashboard/MyDashboard.vue"),
        // meta: {
        //   title: "common.lbl.home",
        // },
      },
      {
        path: UP_PAGE.USERS,
        name: "Users",
        beforeEnter: checkAuth,
        component: () => import("@/views/admin/Users.vue"),
      },
      {
        path: UP_PAGE.MENUS,
        name: "Menus",
        beforeEnter: checkAuth,
        component: () => import("@/views/admin/Menus.vue"),
      },
    ],
  },
];

/* 인증 확인 */
async function checkAuth(to, from, next) {
  const accessToken = store.getters["auth/getAccessToken"];
  if (undefined != accessToken && null != accessToken) {
    try {
      const { data } = await $checkAuth();
      if (data.status == 200) {
        next();
      }
    } catch (error) {
      next(UP_PAGE.LOGIN);
    }
  } else {
    next(UP_PAGE.LOGIN);
  }
  return true;
}

/* 로그인 여부 확인 */
async function isSigned(to, from, next) {
  const token = store.getters["auth/getAccessToken"];
  if (undefined === token || null === token || "" === token) {
    next();
  } else {
    next(UP_PAGE.MAIN);
  }
}

export default new Router({
  mode: "history",
  // base: process.env.VUE_APP_BASE_URL,
  routes: routes,
});
