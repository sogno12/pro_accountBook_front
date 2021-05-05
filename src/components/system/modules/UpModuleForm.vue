<template>
  <div>
    <v-card class="pa-0 ma-2" outlined>
      <v-avatar color="indigo" class="float-left">
        <v-icon dark>
          fa-folder
        </v-icon>
      </v-avatar>
      <v-card-title class="headline">
        모듈 추가
      </v-card-title>
      <v-row class="ma-0">
        <v-col>
          <ValidationObserver ref="form">
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.moduleId"
                  label="모듈 아이디"
                  :disabled="editMode == 'edit' ? true : false"
                  :rules="rules.moduleId"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.moduleName"
                  label="모듈명"
                  :rules="rules.moduleName"
                >
                </up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.sortNo"
                  label="정렬순서"
                  type="number"
                  :rules="rules.sortNo"
                >
                </up-text-field>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col>
          <v-row class="ma-0">
            <v-spacer></v-spacer>
            <v-btn
              v-show="editMode == 'add'"
              class="mx-1"
              color="success"
              @click="createModule"
              >추가</v-btn
            >
            <v-btn
              v-show="editMode == 'edit'"
              class="mx-1"
              color="warning"
              @click="updateModule"
              >수정</v-btn
            >
            <v-btn
              v-show="editMode == 'edit'"
              class="mx-1"
              color="error"
              @click="deleteModule"
              >삭제</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import {
  $getModule,
  $createModule,
  $updateModule,
  $deleteModule,
} from "@/api/module.js";
export default {
  components: {
    ValidationObserver,
  },
  props: {
    moduleId: null,
    editMode: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      form: {
        moduleId: null,
        moduleName: null,
        sortNo: null,
      },
      rules: {
        moduleId: {
          required: true,
        },
        modulName: {
          required: true,
        },
        sortNo: {
          required: true,
        },
      },
    };
  },
  methods: {
    init() {
      this.form = {
        moduleId: null,
        moduleName: null,
        sortNo: null,
      };
    },
    async getModule(moduleId) {
      try {
        console.log("getModule", moduleId);
        const { data } = await $getModule(moduleId);
        const result = data.result;
        console.log("result", result);
        this.form = result;
      } catch (error) {
        console.log("getModule", error);
      }
    },
    async createModule() {
      if (await this.$refs.form.validate()) {
        try {
          const params = this.form;
          await $createModule(params);
          this.init();
          this.$emit("refresh");
        } catch (error) {
          console.log("createModule", error);
        }
      }
    },
    async updateModule() {
      if (await this.$refs.form.validate()) {
        try {
          const params = this.form;
          await $updateModule(params);
          this.init();
          this.$emit("refresh");
        } catch (error) {
          console.log("updateModule", error);
        }
      }
    },
    async deleteModule() {
      try {
        // TODO.삭제확인
        await $deleteModule(this.form.moduleId);
        this.init();
        this.$emit("refresh");
      } catch (error) {
        console.log("deleteModule", error);
      }
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    editMode(mode) {
      if (mode == "add") {
        this.init();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
