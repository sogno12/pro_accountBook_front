<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      v-model="innerValue"
      :options.sync="innerOptions"
      :footer-props="innerFooterProps"
      @update:page="updatePage"
      @update:sort-by="updatePage"
      @update:multi-sort-by="updatePage"
      @update:sort-desc="updatePage"
      @update:items-per-page="updatePage"
    >
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    options: Object,
    footerProps: {
      type: Object,
      default() {
        return {
          itemsPerPageOptions: [5, 10, 20],
        };
      },
    },
  },
  computed: {
    pageParams() {
      return {
        page: this.innerOptions.page - 1,
        size: this.setItemsPerPage(),
        sort: this.getSortGroup(),
      };
    },
  },
  data() {
    return {
      innerValue: this.selected,
      innerOptions: this.options,
      innerFooterProps: this.footerProps,
    };
  },
  methods: {
    async updatePage() {
      this.innerOptions.pageParams = this.pageParams;
      await this.$emit("update");
    },
    setItemsPerPage() {
      if (!this.innerOptions.itemsPerPage) {
        this.innerOptions.itemsPerPage = this.footerProps[
          "itemsPerPageOptions"
        ][0];
      }
      return this.innerOptions.itemsPerPage;
    },
    getSortGroup() {
      let sortGroup = [];
      if (this.innerOptions.sortBy) {
        this.innerOptions.sortBy.forEach((v, i) => {
          sortGroup.push(
            `${v},${this.innerOptions.sortDesc[i] ? "desc" : "asc"}`
          );
        });
      }
      return sortGroup;
    },
  },
  watch: {
    selected(v) {
      this.innerValue = v;
    },
    innerValue(v) {
      this.$emit("input", v);
    },
    options(v) {
      this.innerOptions = v;
    },
  },
  async created() {
    this.innerOptions.pageParams = this.pageParams;
    if (this.selected) {
      this.innerValue = this.selected;
    }
  },
};
</script>

<style lang="scss" scoped></style>
