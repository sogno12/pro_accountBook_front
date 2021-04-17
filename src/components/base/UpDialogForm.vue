<template>
  <div>
    <v-card>
      <!-- 타이틀 -->
      <slot name="title">
        <v-toolbar dark dense elevation="1" :color="toolbarType">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
      </slot>
      <v-row class="ma-0">
        <!-- 본문 -->
        <slot name="contents"> </slot>
      </v-row>
      <!-- 버튼 -->
      <v-card-actions class="mx-2">
        <slot name="actions">
          <v-spacer></v-spacer>
          <span>
            <v-btn
              v-if="useBtn('add')"
              color="success"
              tile
              dark
              class="ml-1"
              elevation="3"
              @click.stop="addItem"
            >
              <v-icon small>fa-plus</v-icon>
            </v-btn>
            <v-btn
              v-if="useBtn('edit')"
              color="warning"
              tile
              dark
              class="ml-1"
              elevation="3"
              @click.stop="editItem"
            >
              <v-icon small>fa-edit</v-icon>
            </v-btn>
            <v-btn
              v-if="useBtn('delete')"
              color="error"
              tile
              dark
              class="ml-1"
              elevation="3"
              @click.stop="deleteItem"
            >
              <v-icon small>fa-trash-alt</v-icon>
            </v-btn>
          </span>
        </slot>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Array,
      default() {
        return ["add"];
      }, // add, edit
    },
    title: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    toolbarType() {
      switch (this.type) {
        case "add":
          return "primary lighten-2";
        case "edit":
          return "warning lighten-2";
        default:
          return "primary lighten-2";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    addItem() {
      this.$emit("addItem");
    },
    editItem() {
      this.$emit("editItem");
    },
    deleteItem() {
      this.$emit("deleteItem");
    },
    useBtn(type) {
      return this.type.includes(type);
    }
  },
};
</script>

<style lang="scss" scoped></style>
