<template>
  <div>
    <up-dialog-form
      title="상태 변경"
      :type="type"
      dense
      @editItem="chageStatus"
    >
      <template #contents>
        <v-col>
          <ValidationObserver ref="form">
            <v-row class="ma-0" dense>
              <up-select
                v-model="innerValue"
                :items="selectStatus"
                :rules="rules.status"
              ></up-select>
            </v-row>
          </ValidationObserver>
        </v-col>
      </template>
    </up-dialog-form>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { $chageStatus } from "@/api/user.js";
export default {
  components: {
    ValidationObserver,
  },
  props: {
    userId: null,
    editMode: null,
    status: null,
  },
  computed: {
    type() {
      switch (this.editMode) {
        case "add":
          return ["add"];
        case "edit":
          return ["edit"];
        default:
          return ["edit"];
      }
    },
  },
  data() {
    return {
      innerValue: this.status,
      selectStatus: [
        { text: "활성", value: "ACTIVE" },
        { text: "비활성", value: "INACTIVE" },
        { text: "잠김", value: "LOCKED" },
      ],
      rules: {
        status: {
          required: true,
        },
      },
    };
  },
  methods: {
    async chageStatus() {
      if (await this.$refs.form.validate()) {
        try {
          // 1. userId와 status 담기
          const params = {
            userId: this.userId,
            status: this.innerValue,
          };
          // 2. 상태변경
          await $chageStatus(params);
          //TODO 3. 성공알림
          alert("성공!");
          // 4. 다이얼로그 닫기
          this.$emit("close");
        } catch (error) {
          console.log("chageStatus", error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
