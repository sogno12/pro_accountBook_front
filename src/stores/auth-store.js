/**
 * 인증 Vuex store
 */

export default {
  namespaced: true,
  state: {
    authorization: {
      // 인증 정보
      // accessToken: null,
      // avatarUrl : null,
      // deptId: null,
      // expiresIn: null,
      // features: [],
      // localeCode: null,
      // loginId: null,
      // passwordChangedAt: null,
      // refreshToken: null,
      // tokenType: null,
      // userNo: null
      // userName: null
      // isChangedInitPwd: false,
      features: [],
    },
  },
  mutations: {
    /**
     * 인증 설정 mutation
     */
    SET_AUTHORIZATION(state, authorization) {
      state.authorization = authorization;
      if (null == authorization) {
        // 인증정보 삭제 시
        localStorage.removeItem("upab");
      }
    },
  },
  getters: {
    /**
     * 인증 취득 getter
     */
    getAuthorization: (state) => {
      return state.authorization;
    },
    /**
     * 토큰 정보 취득 getter
     */
    getAccessToken: (state) => {
      let accessToken = null;
      if (state.authorization.tokenType) {
        console.log("state", state.authorization);
        accessToken = `${state.authorization.tokenType} ${state.authorization.accessToken}`;
      }
      return accessToken;
    },
    /**
     * 사용자번호 취득 getter
     */
    getUserId: (state) => {
      if (state.authorization) {
        return state.authorization.userId;
      } else {
        return null;
      }
    },
  },
  actions: {
    /**
     * 인증값 설정 action
     * @param {*} param0
     * @param {*} authorization
     */
    setAuthorization({ commit }, authorization) {
      commit("SET_AUTHORIZATION", authorization);
    },
    /**
     * 인증값 초기화
     * @param {*} param0
     */
    initAuthorization({ commit }) {
      commit("SET_AUTHORIZATION", null);
    },
  },
};
