<template>
  <div>
    <v-row>
      <v-col>
        <up-treeview
          title="모듈"
          :data="modules"
          rootIdValue="root"
          rootIdField="upModuleId"
          itemIdField="moduleId"
          itemLabelField="moduleName"
          :editable="true"
          :return-object="true"
          :btnSet="btnSet"
          @addItem="createRule"
          @update:active="get"
        >
          <template #title-append>
            <v-btn color="success" @click="createModule">
              추가
            </v-btn>
          </template>
          <template #label="{item}"> {{ item.name }} [{{ item.id }}] </template>
        </up-treeview>
      </v-col>
      <v-col>
        <up-module-form
          v-show="showForm == 'module'"
          :editMode="editMode"
          :moduleId="selectedModule"
          @refresh="refresh"
          ref="moduleForm"
        ></up-module-form>
        <up-rule-form
          v-show="showForm == 'rule'"
          :editMode="editMode"
          :moduleId="selectedModule"
          :ruleId="selectedRule"
          @refresh="refresh"
          ref="ruleForm"
        ></up-rule-form>
        <up-api-form
          v-show="showForm == 'api'"
          :editMode="editMode"
          :apiId="selectedApi"
          @refresh="refresh"
          ref="apiForm"
        >
        </up-api-form>
      </v-col>
    </v-row>
    <v-dialog v-model="apiDialog">
      <v-card>
        <v-app-bar dense color="success lighten-2" dark>
          <v-app-bar-title>
            API 선택
          </v-app-bar-title>
        </v-app-bar>
        <up-api-list :show-select="apiDialog" @select="createRuleApi">
        </up-api-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { $getModuleTree, $createRuleApi } from "@/api/module.js";
import UpModuleForm from "@/components/system/modules/UpModuleForm";
import UpRuleForm from "@/components/system/modules/UpRuleForm";
import UpApiForm from "@/components/system/modules/UpApiForm";
import UpApiList from "@/components/system/apis/UpApiList";
export default {
  components: {
    UpModuleForm,
    UpRuleForm,
    UpApiForm,
    UpApiList,
  },
  computed: {
    btnSet() {
      switch (this.selectedItemLv) {
        case 1:
          return ["add"];
        case 2:
          return ["add"];
        case 3:
          return [];
        default:
          return [];
      }
    },
  },
  data() {
    return {
      modules: [],
      showForm: null,
      selectedItemLv: 1,
      selectedModule: null,
      selectedRule: null,
      selectedApi: null,
      editMode: "add",
      apiDialog: false,
    };
  },
  methods: {
    async getModuleTree() {
      try {
        const { data } = await $getModuleTree();
        this.modules = data.result;
      } catch (error) {
        console.log("getModuleTree", error);
      }
    },
    createModule() {
      this.editMode = "add";
      this.showForm = "module";
    },
    createRule(item) {
      if (item.lv == 1) {
        this.editMode = "add";
        this.selectedModule = item.moduleId;
        this.showForm = "rule";
      } else if (item.lv == 2) {
        this.apiDialog = true;
        this.selectedRule = item.moduleId;
      }
    },
    refresh() {
      this.showForm = null;
      this.selectedModule = null;
      this.getModuleTree();
    },
    get(item) {
      if (item.length > 0) {
        this.selectedItemLv = item[0].content.lv;
        this.editMode = "edit";
        if (item[0].content.lv == 1) {
          this.$refs.moduleForm.getModule(item[0].id);
          this.showForm = "module";
        } else if (item[0].content.lv == 2) {
          this.selectedModule = null;
          this.$refs.ruleForm.getRule(item[0].id);
          this.showForm = "rule";
        } else if (item[0].content.lv == 3) {
          this.$refs.apiForm.getApi(item[0].parentId, item[0].id);
          this.showForm = "api";
        }
      }
    },
    async createRuleApi(selectApi) {
      try {
        let params = {
          ruleId: this.selectedRule,
        };
        params.apis = selectApi;
        await $createRuleApi(params);
        // TODO 성공메세지
        alert("추가성공");
        this.getModuleTree();
        this.apiDialog = false;
      } catch (error) {
        console.log("createRuleApi", error);
      }
    },
  },
  mounted() {
    this.getModuleTree();
  },
};
</script>

<style lang="scss" scoped></style>
