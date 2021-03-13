import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; // store refrsh시 사라지지 않도록 locaㅣstorage관리
import auth from "@/stores/auth-store"; // 인증관련 vuex store 관리

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
  },
  strict: false,
  plugins: [
    createPersistedState({
      key: "upab", // sessionStorage or localStorage의 키가 되므로, 다른 앱과 구분되는 유니크한 열로 사용
      paths: [
        // 리프레시 시에 보존 할 veux store를 지정
        "auth.authorization",
      ],
      storage: window.localStorage, // 스토리지 방식 설정 (로컬스토리지로도 변경 가능)
    }),
  ],
});