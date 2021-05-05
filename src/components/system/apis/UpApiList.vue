<template>
  <div>
    <v-row class="ma-0">
      <v-col class="ma-2 pa-2">
        <up-table
          v-model="table.selected"
          v-bind="$attrs"
          v-on="$listeners"
          :headers="headers"
          :items="table.items"
          :options.sync="table.options"
          :server-items-length="table.totalElements"
          :item-key="table.itemKey"
          :loading="table.loading"
          :show-select="showSelect"
          @update="getApis"
          dense
          @click:row="rowClick"
        >
          <template #top>
            <v-row>
              <v-col>
                <up-text-field
                  v-model="filters.apiId"
                  label="API 아이디"
                  outlined
                  dense
                  clearable
                  @keyup.enter="searchApi"
                ></up-text-field>
              </v-col>
              <v-col>
                <up-text-field
                  v-model="filters.description"
                  label="API 상세"
                  outlined
                  dense
                  clearable
                  @keyup.enter="searchApi"
                ></up-text-field>
              </v-col>
              <v-col>
                <up-select
                  v-model="filters.accessScope"
                  :items="selectAccessScope"
                  label="접근권한"
                  outlined
                  dense
                  clearable
                  @change="searchApi"
                >
                </up-select>
              </v-col>
              <v-col>
                <v-btn class="mx-1" color="secondary" @click="searchApi">
                  검색
                </v-btn>
                <v-btn
                  v-show="!showSelect"
                  class="mx-1"
                  color="success"
                  @click="createApi"
                >
                  추가
                </v-btn>
                <v-btn
                  v-show="showSelect"
                  class="mx-1"
                  color="success"
                  @click="selectApi"
                >
                  선택
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </up-table>
      </v-col>
    </v-row>
    <v-dialog v-model="formDialog" width="400px">
      <up-api-form :apiId="selectedApiId" :editMode="editMode" @close="close">
      </up-api-form>
    </v-dialog>
  </div>
</template>

<script>
import { $getApis } from "@/api/api.js";
import UpApiForm from "@/components/system/apis/UpApiForm";
export default {
  components: {
    UpApiForm,
  },
  props: {
    showSelect: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "API 아이디",
          value: "apiId",
          align: "center",
        },
        {
          text: "API 상세",
          value: "description",
          align: "center",
        },
        {
          text: "HTTP 분류",
          value: "httpType",
          align: "center",
        },
        {
          text: "URL",
          value: "url",
          align: "center",
        },
        {
          text: "접근권한",
          value: "accessScope",
          align: "center",
        },
      ];
    },
    selectedApi() {
      let selected = [];
      this.table.selected.forEach(e => {
        selected.push(e.description)
      })
      return selected;
    },
    selectedId() {
      let selected = [];
     
      this.table.selected.forEach(e => {
        selected.push(e.apiId);
      });
      return selected;
    }
  },
  data() {
    return {
      table: {
        items: [],
        itemKey: "apiId",
        options: {
          multiSort: true,
          sortBy: ["updatedAt"],
          sortDesc: [true],
          page: 1,
          itemsPerPage: 5,
        },
        loading: false,
        selected: [],
      },
      filters: {
        apiId: null,
        description: null,
        accessScope: null,
      },
      formDialog: false,
      selectedApiId: null,
      editMode: "add",
      selectAccessScope: [
        { text: "모든 사용자", value: "PUBLIC" },
        { text: "인증된 사용자", value: "AUTHENTICATED" },
        { text: "권한있는 사용자", value: "AUTHORIZED" },
      ],
    };
  },
  methods: {
    init() {
      this.filters = {
        apiId: null,
        description: null,
        accessScope: null,
      };
      this.table.selected = [];
    },
    searchApi() {
      this.table.options.page = 1;
      this.getApis(0);
    },
    async getApis(page) {
      try {
        const params = this.filters;
        params.size = this.table.options.pageParams.size;
        params.page = this.table.options.pageParams.page;
        params.sort = this.table.options.pageParams.sort;
        if (page != null) {
          params.page = page;
        }
        const { data } = await $getApis(params);
        const result = data.result;
        this.table.totalElements = result.totalElements;
        this.table.items = result.content;
      } catch (error) {
        console.log("error", error);
      }
    },
    rowClick(item) {
      if (!this.showSelect) {
        this.editMode = "edit";
        this.selectedApiId = item.apiId;
        this.formDialog = true;
      }
    },
    async createApi() {
      this.editMode = "add";
      this.selectedApiId = null;
      this.formDialog = true;
    },
    async selectApi() {
      this.init();
      this.$emit("select", this.selectedId);
    },
    close() {
      this.selectedApiId = null;
      this.formDialog = false;
      this.getApis();
    },
  },
  mounted() {
    this.getApis();
  },
};
</script>

<style lang="scss" scoped></style>
