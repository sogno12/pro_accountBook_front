/**
 * API 관리 API
 */

import { apiAuth } from "@/api/index";

const AUTH_PATH = {
  API: "up/api", // 메뉴 API
};

/** 모든 API 조회 */
function $getApis(params) {
    return apiAuth.get(AUTH_PATH.API, {params: params});
}

/** 단일 API 조회 */
function $getApi(apiId) {
    return apiAuth.get(AUTH_PATH.API + `/${apiId}`);
}

/** API 생성 */
function $createApi(params) {
    return apiAuth.post(AUTH_PATH.API, params);
}

/** API 수정 */
function $updateApi(params) {
    return apiAuth.put(AUTH_PATH.API + `/${params.apiId}`, params);
}

/** API 삭제 */
function $deleteApi(apiId) {
    return apiAuth.delete(AUTH_PATH.API + `/${apiId}`);
}

export {
    $getApis, $getApi, $createApi, $updateApi, $deleteApi
};