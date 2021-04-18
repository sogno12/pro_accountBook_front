<template>
  <div>
    <v-row class="ma-0">
      <v-col class="ma-2 pa-2">
        <up-table
          v-model="table.selected"
          :headers="headers"
          :items="table.items"
          :options.sync="table.options"
          :server-items-length="table.totalElements"
          :item-key="table.itemKey"
          :loading="table.loading"
          @update="getUsers"
          dense
          @click:row="rowClick"
        >
          <template #top>
            <v-row>
              <v-col>
                <up-text-field
                  v-model="filters.loginId"
                  label="로그인 아이디"
                  outlined
                  dense
                  clearable
                  @keyup.enter="searchUser"
                >
                </up-text-field>
              </v-col>
              <v-col>
                <up-text-field
                  v-model="filters.userName"
                  label="사용자명"
                  outlined
                  dense
                  clearable
                  @keyup.enter="searchUser"
                >
                </up-text-field>
              </v-col>
              <v-col>
                <up-select
                  v-model="filters.status"
                  :items="selectStatus"
                  label="계정상태"
                  outlined
                  dense
                  clearable
                  @change="searchUser"
                >
                </up-select>
              </v-col>
              <v-col>
                <v-btn class="mx-1" color="secondary" @click="searchUser">
                  검색
                </v-btn>
                <v-btn class="mx-1" color="primary" @click="createUser">
                  추가
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <template #item.status="item">
            <v-chip
              :color="getColor(item.value)"
              dark
              small
              @click.stop="chageStatus(item)"
            >
              {{ item.value }}
            </v-chip>
          </template>
        </up-table>
      </v-col>
    </v-row>
    <v-dialog v-model="formDialog" max-width="400">
      <up-user-form
        :userId="selectedUserId"
        :editMode="editMode"
        @close="close"
      ></up-user-form>
    </v-dialog>
    <v-dialog v-model="statusDialog" max-width="200">
      <up-user-status-form
        :userId="selectedUserId"
        :editMode="editMode"
        :status="selectedStatus"
        @close="close"
      >
      </up-user-status-form>
    </v-dialog>
  </div>
</template>

<script>
import { $getUsers } from "@/api/user.js";
import UpUserForm from "@/components/admin/users/UpUserForm";
import UpUserStatusForm from "@/components/admin/users/UpUserStatusForm";
export default {
  components: {
    UpUserForm,
    UpUserStatusForm,
  },
  computed: {
    headers() {
      return [
        {
          text: "로그인 아이디",
          value: "loginId",
          align: "center",
        },
        {
          text: "사용자명",
          value: "userName",
          align: "center",
        },
        {
          text: "이메일",
          value: "email",
          align: "center",
        },
        {
          text: "계정상태",
          value: "status",
          align: "center",
        }
      ];
    },
  },
  data() {
    return {
      table: {
        items: [],
        itemKey: "userId",
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
        loginId: null,
        userName: null,
        status: null,
      },
      formDialog: false,
      statusDialog: false,
      selectedUserId: null,
      selectedStatus: null,
      editMode: "add",
      selectStatus: [
        { text: "활성", value: "ACTIVE" },
        { text: "비활성", value: "INACTIVE" },
        { text: "잠김", value: "LOCKED" },
      ],
    };
  },
  methods: {
    searchUser() {
      this.table.options.page = 1;
      this.getUsers(0);
    },
    async getUsers(page) {
      this.table.loading = true;
      try {
        // 1. 필터 정보 담기
        let params = this.filters;
        // 2. Pageable 정보 담기
        params.size = this.table.options.pageParams.size;
        params.page = this.table.options.pageParams.page;
        params.sort = this.table.options.pageParams.sort;
        if (page != null) {
          params.page = page;
        }

        // 3. 목록 조회
        const { data } = await $getUsers(params);
        const result = data.result;
        this.table.totalElements = result.totalElements;
        this.table.items = result.content;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.table.loading = false;
      }
    },
    async createUser() {
      this.editMode = "add";
      this.selectedUserId = null;
      this.formDialog = true;
    },
    getColor(value) {
      switch (value) {
        case "ACTIVE":
          return "success";
        case "LOCKED":
          return "warning";
        case "INACTIVE":
          return "grey";
        default:
          return "warning";
      }
    },
    rowClick(item) {
      this.editMode = "edit";
      this.selectedUserId = item.userId;
      this.formDialog = true;
    },
    close() {
      this.selectedUserId = null;
      this.formDialog = false;
      this.statusDialog = false;
      this.getUsers();
    },
    chageStatus(item) {
      this.editMode = "edit";
      this.selectedUserId = item.item.userId;
      this.selectedStatus = item.item.status;
      this.statusDialog = true;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped></style>
