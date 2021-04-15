<template>
  <div>
    <up-dialog-form
      title="메뉴 추가"
      :type="type"
      @addItem="addMenu"
      @editItem="editMenu"
      @deleteItem="deleteMenu"
    >
      <template #contents>
        <v-col>
          <v-row class="ma-0" dense>
            <v-col>
              <v-text-field v-model="form.upMenuId" label="상위 메뉴" disabled>
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.menuId"
                label="메뉴아이디"
                :disabled="editMode == 'edit' ? true : false"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <v-text-field v-model="form.menuName" label="메뉴명">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.menuType"
                label="메뉴타입"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <v-text-field v-model="form.menuPath" label="메뉴경로">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="form.menuIcon" label="메뉴아이콘">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <v-text-field v-model="form.description" label="설명">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <v-text-field
                v-model="form.sortNo"
                type="number"
                label="정렬순서"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </template>
    </up-dialog-form>
  </div>
</template>

<script>
import {
  $getMenuDetail,
  $createMenu,
  $updateMenu,
  $deleteMenu,
} from "@/api/menu.js";
export default {
  props: {
    menuId: String,
    editMode: {
      type: String,
      default: "add", // 'add' / 'edit'
    },
  },
  computed: {
    type() {
      switch (this.editMode) {
        case "add":
          return ["add"];
        case "edit":
          return ["edit", "delete"];
        default:
          return ["add"];
      }
    },
  },
  data() {
    return {
      form: {
        menuId: "",
        menuName: "",
        upMenuId: "",
        sortNo: "",
        menuPath: "",
        menuIcon: "",
        description: "",
        menuType: "",
      },
    };
  },
  methods: {
    init() {
      this.form = {
        menuId: "",
        menuName: "",
        upMenuId: "",
        sortNo: "",
        menuPath: "",
        menuIcon: "",
        description: "",
        menuType: "",
      };
    },
    async getMenu() {
      if (this.menuId != null) {
        if (this.editMode == "add") {
          this.form.upMenuId = this.menuId;
        } else if (this.editMode == "edit") {
          // 1. get정보 가져오기
          const { data } = await $getMenuDetail(this.menuId);
          // 2. form에 정보 넣기
          this.form = data.result;
        }
      }
    },
    async addMenu() {
      // TODO 1. Validtion
      try {
        // 2. Form 정보 담기
        const params = this.form;
        // 3. 메뉴 생성
        const { data } = await $createMenu(params);
        // TODO 4. 성공메세지
        alert("성공!" + data);
        // 5. 성공 콘솔 닫기
        this.$emit("close");
      } catch (error) {
        console.log("error", error);
      }
    },
    async editMenu() {
      // TODO 1. Validation
      try {
        // 2. Form 정보 담기
        const params = this.form;
        // 3. 메뉴 수정
        const { data } = await $updateMenu(params);
        // TODO 4. 성공메세지
        alert("성공!" + data);
        // 5. 성공 콘솔 닫기
        this.$emit("close");
      } catch (error) {
        console.log("error", error);
      }
    },
    async deleteMenu() {
      // TODO 1. 메뉴 삭제 확인
      try {
        // 2. 메뉴 삭제
        await $deleteMenu(this.form.menuId);
        // TODO 3. 성공메세지
        // 4. 성공 콘솔 닫기
        this.$emit("close");
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  mounted() {
    this.getMenu();
  },
  watch: {
    menuId() {
      this.init();
      this.getMenu();
    },
    editMode() {
      this.init();
      this.getMenu();
    },
  },
};
</script>

<style lang="scss" scoped></style>
