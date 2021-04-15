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
  MY_ACCOUNTS: "/myAccount/:account",

  /**
   * CoAccountBook
   */
  OUR_ACCOUNTS: "/ourAccount/:account",

  /**
   * MyInfo
   */

  /**
   * Admin
   */
  USERS: '/admin/users',

  /**
   * System
   */
  MENUS: '/system/menus',
  ROLES: '/system/roles',
  RULES: '/system/rules',

};

Vue.prototype.UP_PAGE = UP_PAGE;
