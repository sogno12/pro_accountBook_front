<template>
  <div>
    <up-dialog-form
      :title="title"
      :type="type"
      @addItem="createMenu"
      @editItem="updateMenu"
      @removeItem="deleteMenu"
      dense
    >
      <template #contents>
        <v-col>
          <ValidationObserver ref="form">
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.upMenuId"
                  label="상위 메뉴"
                  disabled
                >
                </up-text-field>
              </v-col>
              <v-col>
                <up-text-field
                  v-model="form.menuId"
                  label="메뉴아이디"
                  :disabled="editMode == 'edit' ? true : false"
                  :rules="rules.menuId"
                >
                </up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.menuName"
                  label="메뉴명"
                  :rules="rules.menuName"
                >
                </up-text-field>
              </v-col>
              <v-col>
                <up-select
                  v-model="form.menuType"
                  label="메뉴타입"
                  :rules="rules.menuType"
                  :items="selectType"
                >
                </up-select>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.menuPath"
                  label="메뉴경로"
                  :rules="rules.menuPath"
                >
                </up-text-field>
              </v-col>
              <v-col>
                <up-text-field v-model="form.menuIcon" label="메뉴아이콘">
                </up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field v-model="form.description" label="설명">
                </up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.sortNo"
                  type="number"
                  label="정렬순서"
                  :rules="rules.sortNo"
                ></up-text-field>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-col>
      </template>
    </up-dialog-form>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import {
  $getMenuDetail,
  $createMenu,
  $updateMenu,
  $deleteMenu,
} from "@/api/menu.js";
export default {
  components: {
    ValidationObserver,
  },
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
    title() {
      switch (this.editMode) {
        case "add":
          return "메뉴 추가";
        case "edit":
          return "메뉴 수정";
        default:
          return "메뉴 추가";
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
      rules: {
        menuId: {
          required: true,
          alpha_dash: true,
        },
        menuName: {
          required: true,
        },
        menuType: {
          required: true,
        },
        menuPath: {
          required: true,
        },
        sortNo: {
          required: true,
        },
      },
      selectType: [
        { text: "라우터", value: "ROUTE"}
      ]
    };
  },
  methods: {
    async init() {
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
      this.$refs.form.reset();
      await this.getMenu();
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
    async createMenu() {
      // 1. Validtion
      if (await this.$refs.form.validate()) {
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
      }
    },
    async updateMenu() {
      // 1. Validation
      if (await this.$refs.form.validate()) {
        try {
          // 2. Form 정보 담기
          const params = this.form;
          // 3. 메뉴 수정
          const { data } = await $updateMenu(params);
          // TODO 4. 성공메세지
          alert("성공!" + data);
          // 5. 성공 다이얼로그 닫기
          this.$emit("close");
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    async deleteMenu() {
      // TODO 1. 메뉴 삭제 확인
      try {
        // 2. 메뉴 삭제
        await $deleteMenu(this.form.menuId);
        // TODO 3. 성공메세지
        // 4. 성공 다이얼로그 닫기
        this.$emit("close");
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    menuId() {
      this.init();
    },
    editMode() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped></style>
