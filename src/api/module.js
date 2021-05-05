/**
 * 모듈 관리 API
 */

import { apiAuth } from "@/api/index";

const AUTH_PATH = {
  MODULE: "up/module", // 모듈 API
  RULE: "up/rule", // 권한 API
};

/** 모듈트리 조회 */
function $getModuleTree() {
  return apiAuth.get(AUTH_PATH.MODULE + `/tree`);
}

/** 모듈 조회 API */
function $getModule(moduleId) {
  return apiAuth.get(AUTH_PATH.MODULE + `/${moduleId}`);
}

/** 모듈 생성 API */
function $createModule(params) {
  return apiAuth.post(AUTH_PATH.MODULE, params);
}

/** 모듈 수정 API */
function $updateModule(params) {
  return apiAuth.put(AUTH_PATH.MODULE + `/${params.moduleId}`, params);
}

/** 모듈 삭제 API */
function $deleteModule(moduleId) {
  return apiAuth.delete(AUTH_PATH.MODULE + `/${moduleId}`);
}

/** 권한 조회 API */
function $getRule(ruleId) {
  return apiAuth.get(AUTH_PATH.RULE + `/${ruleId}`);
}

/** 권한 생성 API */
function $createRule(params) {
  return apiAuth.post(AUTH_PATH.RULE, params);
}

/** 권한 수정 API */
function $updateRule(params) {
    return apiAuth.put(AUTH_PATH.RULE + `/${params.ruleId}`, params);
}

/** 권한 삭제 API */
function $deleteRule(ruleId) {
    return apiAuth.delete(AUTH_PATH.RULE + `/${ruleId}`);
}

/** 권한-API 추가 API */
function $createRuleApi(params) {
  return apiAuth.post(AUTH_PATH.RULE + `/api`, params);
}

/** API 조회 API */
function $getApi(ruleId, apiId) {
  return apiAuth.get(AUTH_PATH.RULE + `/${ruleId}/${apiId}`);
}

/** API 삭제 API */
function $deleteRuleApi(params) {
  return apiAuth.delete(AUTH_PATH.RULE + `/${params.ruleId}/${params.apiId}`);
}

export {
  $getModuleTree,
  $getModule,
  $createModule,
  $updateModule,
  $deleteModule,
  $getRule,
  $createRule,
  $updateRule,
  $deleteRule,
  $createRuleApi,
  $getApi,
  $deleteRuleApi,
};
