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
          <v-row class="ma-0" dense>
            <v-select v-model="innerValue" :items="selectStatus"> </v-select>
          </v-row>
        </v-col>
      </template>
    </up-dialog-form>
  </div>
</template>

<script>
import { $chageStatus } from "@/api/user.js"
export default {
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
    };
  },
  methods: {
    async chageStatus() {
        try {
            // 1. userId와 status 담기
            const params = {
                userId : this.userId,
                status : this.innerValue
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
