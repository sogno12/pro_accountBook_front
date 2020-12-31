/**
 * 인증처리 API
 */

import { apiNonAuth } from "@/api/index";

const AUTH_PATH = {
  LOGIN: "/up/auth/login", // 로그인 API
};

// 로그인 API
function $login(loginInfo) {
  return apiNonAuth.post(AUTH_PATH.LOGIN, loginInfo);
}

export { $login };
