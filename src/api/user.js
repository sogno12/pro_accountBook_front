/**
 * 사용자 API
 */
import { apiAuth } from "@/api/index";

const AUTH_PATH = {
    USER : "up/users"
}

/** 모든 사용자 조회 */
function $getUsers(params) {
   return apiAuth.get(AUTH_PATH.USER, {params: params});
}

/** 단일 사용자 조회 */
function $getUser(userId) {
   return apiAuth.get(AUTH_PATH.USER + `/${userId}`);
}

/** 사용자 생성 */
function $createUser(params) {
   return apiAuth.post(AUTH_PATH.USER, params);
}

/** 사용자 수정 */
function $updateUser(params) {
   return apiAuth.put(AUTH_PATH.USER + `/${params.userId}`, params);
}

/** 사용자 삭제 */
function $deleteUser(userId) {
   return apiAuth.delete(AUTH_PATH.USER + `/${userId}`);
}

/** 사용자 상태 변경 */
function $chageStatus(params) {
   return apiAuth.put(AUTH_PATH.USER + `/status`, params);
}

export { $getUsers, $getUser, $createUser, $updateUser, $deleteUser, $chageStatus };