<template>
  <v-main>
    <!-- v-main : Vuetify의에서 v-app구성 요소와 응용 프로그램 등의 구성 요소에 소품 v-navigation-drawer, v-app-bar, v-footer주위의 적절한 크기와 응용 프로그램 부트 스트랩 및 더 많은 돕는 요소입니다.-->
    <UpSideMenu></UpSideMenu>
    <UpHeader></UpHeader>
    <v-fade-transition mode="out-in" origin="bottom center 0">
      <router-view></router-view>
    </v-fade-transition>
  </v-main>
</template>

<script>
import UpHeader from "@/components/layout/UpHeader.vue";
import UpSideMenu from "@/components/layout/UpSideMenu.vue";
export default {
  components: {
    UpSideMenu,
    UpHeader,
  },
};
</script>

<style lang="scss" scoped></style>
