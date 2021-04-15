<template>
  <div>
    <v-card>
      <v-card-subtitle>
        <v-breadcrumbs class="pa-0" :items="root" divider=" > "></v-breadcrumbs>
      </v-card-subtitle>
      <v-card-title class="pt-0">
        {{ label }}
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: "메뉴명",
      root: [
        {
          text: "Admin",
          disable: false,
        },
        {
          text: "Menu",
          disable: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
