<template>
  <div>
    <v-card class="pa-0 ma-2" outlined>
      <template slot="progress">
        <v-progress-linear color="primary" indeterminate></v-progress-linear>
      </template>
      <v-toolbar color="primary lighten-1" dark dense>
        <v-icon>{{ icon }}</v-icon>
        <v-toolbar-title class="px-1">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card class="overflow-y-auto" :max-height="scrollHeight" flat>
        <v-treeview
          v-bind="$attrs"
          v-on="$listeners"
          :items="items"
          :open-on-click="openOnClick"
          :hoverable="hoverable"
          :selectable="selectable"
          :activatable="activatable"
          transition
        >
          <!-- wrapping 콤포넌트의 모든 템플릿을 상속 받기 -->
          <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
          <template #append="{ item, active }">
            <slot name="append" :item="item" :active="active">
              <span>
                <v-btn
                  v-if="active"
                  color="success"
                  fab
                  dark
                  x-small
                  class="ml-1"
                  elevation="3"
                  @click.stop="addItem(item)"
                >
                <v-icon
                small
                >fa-plus</v-icon>
                </v-btn>
                <v-btn
                  v-if="active"
                  color="warning"
                  fab
                  dark
                  x-small
                  class="ml-1"
                  elevation="3"
                  @click.stop="editItem(item)"
                >
                <v-icon
                small
                >fa-edit</v-icon>
                </v-btn>
                <v-btn
                  v-if="active"
                  color="error"
                  fab
                  dark
                  x-small
                  class="ml-1"
                  elevation="3"
                  @click.stop="deleteItem(item)"
                >
                <v-icon
                small
                >fa-trash-alt</v-icon>
                </v-btn>
              </span>
            </slot>
          </template>
        </v-treeview>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    icon: {
      type: String,
      default: "mdi-pen",
    },
    title: {
      type: String,
      default: "메뉴 제목",
    },
    scrollHeight: [String, Number],
    openOnClick: Boolean,
    hoverable: {
      type: Boolean,
      default: true,
    },
    editable: Boolean,
    activatable: {
      type: Boolean,
      default: true,
    },
    selectable: Boolean,
    rootIdValue: String, // 최상위코드값
    rootIdField: String, // 상위코드필드명
    itemIdField: String, // 아이템 ID
    itemLabelField: String, // 아이템 Name
    itemIconField: String, // 아이콘필드명
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    setItems() {
      if (this.data.length > 0) {
        const result = this.setChildren(null, true);
        this.items = result;
      }
    },
    setChildren(item, isParent) {
      let target = [];
      if (isParent) {
        target = this.data.filter((i) => {
          return i[this.rootIdField] === this.rootIdValue;
        });
      } else {
        target = this.data.filter((i) => {
          return i[this.rootIdField] === item[this.itemIdField];
        });
      }
      let nodeSet = [];
      target.forEach((i) => {
        let itemSet = {
          id: i[this.itemIdField],
          lebel: i[this.itemLabelField],
          icon: i[this.itemIconField],
          parentId: i[this.rootIdField],
          name: i[this.itemLabelField],
          content: i,
          children: this.setChildren(i),
        };
        nodeSet.push(itemSet);
      });
      return nodeSet;
    },
    addItem(item) {
      this.$emit("addItem", item.id);
    },
    editItem(item){
        this.$emit("editItem", item.content);
    },
    deleteItem(item){
      this.$emit("deleteItem", item.content);
    }
  },
  watch: {
    data() {
      this.setItems();
    },
  },
  created() {
    this.setItems();
  },
};
</script>

<style lang="scss" scoped></style>
