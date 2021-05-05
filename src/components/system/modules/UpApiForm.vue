<template>
  <div>
    <v-card class="pa-0 ma-2" outlined>
      <v-avatar color="green" class="float-left">
        <v-icon dark>
          fa-feather-alt
        </v-icon>
      </v-avatar>
      <v-card-title class="headline">
        API
      </v-card-title>
      <v-row class="ma-0">
        <v-col>
          <v-row class="ma-0" dense>
            <v-col>
              <up-text-field
                v-model="form.ruleName"
                label="권한명"
                disabled
              ></up-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <up-text-field
                v-model="form.ruleId"
                label="권한 아이디"
                disabled
              ></up-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <up-text-field v-model="form.apiId" label="API" disabled>
              </up-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0" dense>
            <v-col>
              <up-text-field
                v-model="form.description"
                label="API 상세"
                disabled
              >
              </up-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col>
          <v-row class="ma-0">
            <v-spacer></v-spacer>
            <v-btn
              v-show="editMode == 'edit'"
              class="mx-1"
              color="error"
              @click="deleteRuleApi"
              >삭제</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { $getApi, $deleteRuleApi } from "@/api/module.js";
export default {
  props: {
    apiId: null,
    editMode: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      form: {
        ruleApiId: null,
        ruleId: null,
        ruleName: null,
        apiId: null,
        description: null,
      },
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
    async getApi(ruleId, apiId) {
      try {
        const { data } = await $getApi(ruleId, apiId);
        const result = data.result;
        this.form = result;
      } catch (error) {
        console.log("getRule", error);
      }
    },
    async deleteRuleApi() {
      try {
        // TODO. 삭제확인
        await $deleteRuleApi(this.form);
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
