import Vue from "vue";

export const UP_PAGE = {
  /**
   * AUTH
   */
  LOGIN: "/login",
  REGISTER: "/register",

  /**
   * HOME
   */
  MAIN: "/",
  HOME: "/home",

  /**
   * MyAccountBook
   */
  MY_ACCOUNT: "/myAccount/:account",

  /**
   * CoAccountBook
   */
  OUR_ACCOUNT: "/ourAccount/:account",

  /**
   * MyInfo
   */

  /**
   * Admin
   */
  USER: '/admin/user'
};

Vue.prototype.UP_PAGE = UP_PAGE;
