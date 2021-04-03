/**
 * 인증처리 API
 */

import { apiAuth, apiNonAuth } from "@/api/index";

const AUTH_PATH = {
  LOGIN: "/up/auth/login", // 로그인 API
  REGISTER: "/up/auth/register", // 로그인 API
  CHECK_AUTH: "/up/auth/checkAuthorization", // 인증 확인
};

const AUTH_RST_CO = {
  SUCCESS: 200,
  UNAUTHORIZED: 401, // 미인증 / 인증기간 만료
  NON_PERMISSION: 403, // API 권한 없음
}

// 로그인 API
function $login(loginInfo) {
  return apiNonAuth.post(AUTH_PATH.LOGIN, loginInfo);
}

// TODO 로그아웃 API

// 회원가입
function $singUp(singUpInfo) {
  return apiNonAuth.post(AUTH_PATH.REGISTER, singUpInfo);
}

// 인증 확인 API
function $checkAuth() {
  return apiAuth.get(AUTH_PATH.CHECK_AUTH)
}


export { AUTH_RST_CO, $login, $singUp, $checkAuth };
