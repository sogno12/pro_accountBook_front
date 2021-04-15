<template>
  <v-data-table
    :items="items"
    :headers="headers"
    :loading="loading"
    :options="options"
    @update:page="update"
    dense
  >
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: Array,
    items: Array,
    loading: Boolean,
    options: Object,
  },
  methods: {
    update() {
      this.$emit("update");
    }
  }
};
</script>

<style lang="scss" scoped></style>
