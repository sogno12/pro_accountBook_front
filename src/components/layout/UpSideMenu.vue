<template>
  <v-navigation-drawer permanent> 네비 </v-navigation-drawer>
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
        console.log("get menu")
        await $getMenu();
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
