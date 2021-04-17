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
            @editItem="updateMenu"
            @removeItem="deleteMenu"
          >
            <template #title-append>
              <v-btn
                color="success"
                @click="createUpMenu"
              >
                추가
              </v-btn>
            </template>
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
import { $getMenu, $deleteMenu } from "@/api/menu.js";
import UpMenuForm from "@/components/system/menus/UpMenuForm"
export default {
  components: {
    UpMenuForm
  },
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
    updateMenu(item) {
      this.editMode = 'edit';
      this.selectedMenuId = item.menuId;
      this.formDialog = true;
    },
    async deleteMenu(item) {
      // TODO 1. 메뉴 삭제 확인
      try {
        // 2. 메뉴 삭제
        await $deleteMenu(item.menuId);
        // TODO 3. 성공메세지
        alert("성공!");
        // 4. 성공 새로고침
        this.close();
      } catch (error) {
        console.log("deleteMenu", error);
      }
    },
    createUpMenu() {
      this.editMode = 'add';
      this.selectedMenuId = "root";
      this.formDialog = true;
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
