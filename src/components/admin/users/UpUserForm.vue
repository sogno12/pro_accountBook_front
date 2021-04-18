<template>
  <div>
    <up-dialog-form
      :title="title"
      :type="type"
      dense
      @addItem="createUser"
      @editItem="updateMenu"
      @removeItem="deleteUser"
    >
      <template #contents>
        <v-col>
          <ValidationObserver ref="form">
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.loginId"
                  label="로그인 아이디"
                  :disabled="editMode == 'edit' ? true : false"
                  :rules="rules.loginId"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.userName"
                  label="사용자명"
                  :rules="rules.userName"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.email"
                  label="사용자 이메일"
                  :rules="rules.email"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-select v-model="form.status" :items="selectStatus">
                </up-select>
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
import { $getUser, $createUser, $updateUser, $deleteUser } from "@/api/user.js";
export default {
  components: {
    ValidationObserver,
  },
  props: {
    userId: Number,
    editMode: {
      type: String,
      default: "add",
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
          return "사용자 추가";
        case "edit":
          return "사용자 수정";
        default:
          return "사용자 수정";
      }
    },
  },
  data() {
    return {
      form: {
        loginId: "",
        userName: "",
        email: "",
      },
      rules: {
        loginId: {
          required: true,
          alpha_num: true,
        },
        userName: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      selectStatus: [
        { text: "활성", value: "ACTIVE" },
        { text: "비활성", value: "INACTIVE" },
        { text: "잠김", value: "LOCKED" },
      ],
    };
  },
  methods: {
    async init() {
      this.form = {
        loginId: "",
        userName: "",
        email: "",
      };
      this.$refs.form.reset();
      await this.getUser();
    },
    async getUser() {
      if (this.userId != null && this.editMode == "edit") {
        try {
          const { data } = await $getUser(this.userId);
          this.form = data.result;
        } catch (error) {
          console.log("getUser", error);
        }
      }
    },
    async createUser() {
      // 1. Validation
      if (await this.$refs.form.validate()) {
        try {
          // 2. Form 정보 담기
          const params = this.form;
          // 3. 사용자 생성
          await $createUser(params);
          // TODO 4. 성공메세지
          alert("성공!");
          // 5. 성공 다이얼로그 닫기
          this.$emit("close");
        } catch (error) {
          console.log("createUser", error);
        }
      }
    },
    async updateMenu() {
      // 1. Validation
      if (await this.$refs.form.validate()) {
        try {
          // 2. Form 정보 담기
          const params = this.form;
          // 3. 사용자 수정
          await $updateUser(params);
          // TODO 4. 성공메세지
          alert("성공!");
          // 5. 성공 다이얼로그 닫기
          this.$emit("close");
        } catch (error) {
          console.log("updateMenu", error);
        }
      }
    },
    async deleteUser() {
      // TODO 1. 사용자 삭제 확인
      try {
        // 2. 사용자 삭제
        await $deleteUser(this.form.userId);
        // TODO 3. 성공메세지
        alert("삭제 성공");
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
    userId() {
      this.init();
    },
    editMode() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped></style>
