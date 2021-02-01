<template>
  <v-navigation-drawer permanent>
    <!-- 메뉴 -->
    <v-list>
      <v-list-group
        v-for="menu in menus"
        :key="menu.menuId"
        :prepend-icon="menu.menuIcon"
      >
        <v-list-item
          v-for="child in menu.children"
          :key="child.menuId"
          :to="RX_PAGE[child.menuId]"
        >
          <v-list-item-title v-text="child.menuName"> </v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { $getMenu } from "@/api/menu.js";

export default {
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    async getMenu() {
      try {
        console.log("get menu");
        const { data } = await $getMenu();
        const menus = data.result;
        console.log("menus", menus);

        // parantMenus 별로 나누기 (root)
        let parentMenus = menus.filters((menu) => {
          return menu.upMenuId === "root";
        });

        // childrenMenus 나누기
        parentMenus.forEach((parentMenu) => {
          let childrenMenu = menus.filters((menu) => {
            return menu.upMenuId === parentMenu.menuId;
          });
          parentMenu.children = childrenMenu;
        });

        this.menus = parentMenus;
      } catch (error) {
        console.log("menu", error);
      }
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
</style>
