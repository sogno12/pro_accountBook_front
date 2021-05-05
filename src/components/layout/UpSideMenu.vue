<template>
  <v-navigation-drawer
    v-model="showFlag"
    fixed
    :mini-variant.sync="miniMode"
    mini-variant-width="80"
    :clipped="!$vuetify.breakpoint.mobile"
    app
  >
    <!-- 메뉴 -->
    <v-list>
      <v-list-group
        v-for="menu in menus"
        :key="menu.menuId"
        :prepend-icon="menu.menuIcon"
      >
        <template #activator>
          <v-list-item-title v-text="menu.menuName"></v-list-item-title>
        </template>
        <v-list-item
          v-for="child in menu.children"
          :key="child.menuId"
          :to="UP_PAGE[child.menuId]"
        >
          <v-list-item-title v-text="child.menuName"> </v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import { $getMenu } from "@/api/menu.js";

export default {
  data() {
    return {
      menus: [],
      miniMode: false,
      showFlag: true,
    };
  },
  methods: {
    // 우선은 가짜값으로 메뉴 그리기
    getMenu() {
      let menus = [
        { menuId: "ADMIN", menuName: "admin", upMenuId: "root" },
        { menuId: "SYSTEM", menuName: "system", upMenuId: "root" },
        { menuId: "MY_ACCOUNTS", menuName: "myAccount", upMenuId: "root" },
        { menuId: "USERS", menuName: "users", upMenuId: "ADMIN" },
        { menuId: "MENUS", menuName: "menu", upMenuId: "SYSTEM" },
        { menuId: "ROLES", menuName: "role", upMenuId: "SYSTEM" },
        { menuId: "APIS", menuName: "api", upMenuId: "SYSTEM" },
        { menuId: "RULES", menuName: "rule", upMenuId: "SYSTEM" },
        { menuId: "MODULES", menuName:"module", upMenuId: "SYSTEM"},
      ];
      // 1. 관리자
      // 2. 시스템
      // 3. 가계부(개인)
      // 4. parantMenus 별로 나누기 (root)
      let parentMenus = menus.filter((menu) => {
        return menu.upMenuId === "root";
      });
      // 5. childrenMenus 나누기
      parentMenus.forEach((parentMenu) => {
        let childrenMenu = menus.filter((menu) => {
          return menu.upMenuId === parentMenu.menuId;
        });
        parentMenu.children = childrenMenu;
      });
      this.menus = parentMenus;
    },
  },
  mounted() {
    this.getMenu();
  },
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer__content {
  padding-left: 8px; /* hover, active 시에 x축 공간 */
  padding-right: 8px;
}
.v-navigation-drawer__content .mini-mode {
  padding-left: 0px; /* hover, active 시에 x축 공간 */
  padding-right: 0px;
}
.v-list-item {
  border-radius: 6px; /* 메뉴아이템 라운드 처리 */
  padding-right: 5px; /* 접기버튼 위치 조정 */
}
.v-list-item__icon {
  min-width: 0;
}

.v-application--is-ltr .v-list-item__action:first-child {
  margin-right: 10px; /* 자식메뉴 아이콘 영역 텍스트 조정 */
}
.v-application--is-ltr
  .v-list-group__items
  .v-list-item__content
  .v-list-item__title {
  margin-left: 20px; /* 자식메뉴 아이콘 영역 텍스트 조정 */
}

.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 10px; /* 그룹 메뉴 아이콘 영역 텍스트 조정 */
}
</style>
