<template>
  <div>
    <up-dialog-form
      :title="title"
      :type="type"
      dense
      @addItem="createApi"
      @editItem="updateApi"
      @removeItem="deleteApi"
    >
      <template #contents>
        <v-col>
          <ValidationObserver ref="form">
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.apiId"
                  label="API 아이디"
                  :disabled="editMode == 'edit' ? true : false"
                  :rules="rules.apiId"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.description"
                  label="API 상세"
                  :rules="rules.description"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-select
                  v-model="form.httpType"
                  label="HTTP 분류"
                  :items="selectHttpType"
                  :rules="rules.httpType"
                >
                </up-select>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.url"
                  label="URL"
                  :rules="rules.url"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-select
                  v-model="form.accessScope"
                  label="접근권한"
                  :items="selectAccessScope"
                  :rules="rules.accessScope"
                >
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
import { $getApi, $createApi, $updateApi, $deleteApi } from "@/api/api.js";
export default {
  components: {
    ValidationObserver,
  },
  props: {
    apiId: String,
    editMode: String,
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
          return "API 추가";
        case "edit":
          return "API 수정";
        default:
          return "API 수정";
      }
    },
  },
  data() {
    return {
      form: {
        apiId: "",
        description: "",
        httpType: "",
        url: "",
        accessScope: "",
      },
      selectHttpType: [
        { text: "GET", value: "GET" },
        { text: "POST", value: "POST" },
        { text: "PUT", value: "PUT" },
        { text: "DELETE", value: "DELETE" },
      ],
      selectAccessScope: [
        { text: "모든 사용자", value: "PUBLIC" },
        { text: "인증된 사용자", value: "AUTHENTICATED" },
        { text: "권한있는 사용자", value: "AUTHORIZED" },
      ],
      rules: {
        apiId: {
          required: true,
        },
        description: {
          required: true,
        },
        httpType: {
          required: true,
        },
        url: {
          required: true,
        },
        accessScope: {
          required: true,
        },
      },
    };
  },
  methods: {
    async init() {
      this.form = {
        apiId: "",
        description: "",
        httpType: "",
        url: "",
        accessScope: "",
      };
      this.$refs.form.reset();
      await this.getApi();
    },
    async getApi() {
      if (this.apiId != null && this.editMode == "edit") {
        try {
          const { data } = await $getApi(this.apiId);
          this.form = data.result;
        } catch (error) {
          console.log("getApi", error);
        }
      }
    },
    async createApi() {
      // 1. Validation
      if (await this.$refs.form.validate()) {
        try {
          // 2. From 정보 담기
          const params = this.form;
          // 3. API 생성
          await $createApi(params);
          // TODO 4. 성공메세지
          alert("성공!");
          // 5. 성공 다이얼로그 닫기
          this.$emit("close");
        } catch (error) {
          console.log("createApi", error);
        }
      }
    },
    async updateApi() {
      // 1. Validtion
      if (await this.$refs.form.validate()) {
        try {
          // 2. Form 정보 담기
          const params = this.form;
          // 3. API 수정
          await $updateApi(params);
          // TODO 4. 성공메세지
          alert("성공!");
          // 5. 성공 다이얼로그 닫기
          this.$emit("close");
        } catch (error) {
          console.log("updateApi", error);
        }
      }
    },
    async deleteApi() {
      // TODO 1. API 삭제 확인
      try {
        // 2. API 삭제
        await $deleteApi(this.form.apiId);
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
    apiId() {
      this.init();
    },
    editMode() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped></style>
