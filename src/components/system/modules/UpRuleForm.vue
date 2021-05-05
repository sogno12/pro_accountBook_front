<template>
  <div>
    <v-card class="pa-0 ma-2" outlined>
      <v-avatar color="green" class="float-left">
        <v-icon dark>
          fa-feather-alt
        </v-icon>
      </v-avatar>
      <v-card-title class="headline">
        권한 추가
      </v-card-title>
      <v-row class="ma-0">
          <v-col>
        <ValidationObserver ref="form">
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.moduleId"
                  label="모듈 아이디"
                  disabled
                  :rules="rules.moduleId"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field
                  v-model="form.ruleId"
                  label="권한 아이디"
                  :disabled="editMode == 'edit' ? true : false"
                    :rules="rules.ruleId"
                ></up-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-0" dense>
              <v-col>
                <up-text-field v-model="form.ruleName" label="권한명"
                  :rules="rules.ruleName">
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
              @click="createRule"
              >추가</v-btn
            >
            <v-btn
              v-show="editMode == 'edit'"
              class="mx-1"
              color="warning"
              @click="updateRule"
              >수정</v-btn
            >
            <v-btn
              v-show="editMode == 'edit'"
              class="mx-1"
              color="error"
              @click="deleteRule"
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
  $getRule,
  $createRule,
  $updateRule,
  $deleteRule,
} from "@/api/module.js";
export default {
  components: {
    ValidationObserver,
  },
  props: {
    moduleId: null,
    ruleId: null,
    editMode: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      form: {
        moduleId: null,
        ruleId: null,
        ruleName: null,
        sortNo: null,
      },
      rules: {
        moduleId: {
          required: true,
        },
        ruleId: {
          required: true,
        },
        ruleName: {
          required : true,
        },
        
      }
    };
  },
  methods: {
    init() {
      this.form = {
        moduleId: null,
        ruleId: null,
        ruleName: null,
        sortNo: null,
      };
    },
    async getRule(ruleId) {
      try {
        const { data } = await $getRule(ruleId);
        const result = data.result;
        this.form = result;
      } catch (error) {
        console.log("getRule", error);
      }
    },
    async createRule() {
      if (await this.$refs.form.validate()) {
        try {
          // TODO. Validation // 동일존재유무확인
          const params = this.form;
          await $createRule(params);
          this.init();
          this.$emit("refresh");
        } catch (error) {
          console.log("createRule", error);
        }
      }
    },
    async updateRule() {
      if (await this.$refs.form.validate()) {
        try {
          // TODO. Validation
          const params = this.form;
          await $updateRule(params);
          this.init();
          this.$emit("refresh");
        } catch (error) {
          console.log("updateRule", error);
        }
      }
    },
    async deleteRule() {
      try {
        // TODO. 삭제확인
        await $deleteRule(this.form.ruleId);
        this.init();
        this.$emit("refresh");
      } catch (error) {
        console.log("deleteRule", error);
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
        this.form.moduleId = this.moduleId;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
