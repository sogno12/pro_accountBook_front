/**
 * 인증처리 API
 */

import { apiNonAuth } from "@/api/index";

const AUTH_PATH = {
  LOGIN: "/up/auth/login", // 로그인 API
  REGISTER: "/up/auth/register", // 로그인 API
};

// 로그인 API
function $login(loginInfo) {
  return apiNonAuth.post(AUTH_PATH.LOGIN, loginInfo);
}

// 로그아웃 API

// 회원가입
function $singUp(singUpInfo) {
  return apiNonAuth.post(AUTH_PATH.REGISTER, singUpInfo);
}



export { $login, $singUp };
