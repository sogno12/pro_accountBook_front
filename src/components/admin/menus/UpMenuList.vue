<template>
  <div>
    <v-card>
      <v-row>
        <v-col>
          <up-treeview
            :data="menus"
            rootIdValue="root"
            rootIdField="upMenuId"
            itemIdField="menuId"
            itemLabelField="menuName"
            :editable="true"
            @addItem="createMenu"
            @editItem="editMenu"
            @removeItem="deleteMenu"
          >
            <template #appendTitle>
              <v-card-actions>
                <v-btn tile outlined color="white" dark>
                  메뉴 추가
                </v-btn>
              </v-card-actions>
            </template>
          </up-treeview>
        </v-col>
        <v-col>
          다른 내용
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="formDialog" max-width="800">
      <up-menu-form
        :menuId="selectedMenuId"
        :editMode="editMode"
        @close="close"
      ></up-menu-form>
    </v-dialog>
  </div>
</template>

<script>
import { $getMenu } from "@/api/menu.js";
export default {
  data() {
    return {
      menus: [],
      formDialog: false,
      selectedMenuId: null,
      editMode: 'add',
    };
  },
  methods: {
    async getMenus() {
      try {
        // 메뉴 정보 가져오기
        const { data } = await $getMenu();
        this.menus = data.result;
      } catch (error) {
        console.log("error");
      }
    },
    createMenu(itemId) {
      this.editMode = 'add';
      this.selectedMenuId = itemId;
      this.formDialog = true;
    },
    editMenu(item) {
      this.editMode = 'edit';
      this.selectedMenuId = item.menuId;
      this.formDialog = true;
    },
    deleteMenu(item) {
      console.log("deleteMenu", item);
    },
    close() {
      this.selectedMenuId = null;
      this.formDialog = false;
      this.getMenus();
    }
  },
  mounted() {
    this.getMenus();
  },
};
</script>

<style lang="scss" scoped></style>
