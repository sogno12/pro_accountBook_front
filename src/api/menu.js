/**
 * 메뉴 관리 API
 */

import { apiAuth } from "@/api/index";

const AUTH_PATH = {
  MENU: "up/menu", // 메뉴 API
};

/** 모든 메뉴 조회 API */
function $getMenu() {
  return apiAuth.get(AUTH_PATH.MENU);
}

/** 메뉴 상세 조회 API */
function $getMenuDetail(menuId) {
  return apiAuth.get(AUTH_PATH.MENU+`/${menuId}`);
}

/** 메뉴 생성 API */
function $createMenu(params) {
  return apiAuth.post(AUTH_PATH.MENU, params);
}

/** 메뉴 수정 API */
function $updateMenu(params) {
  return apiAuth.put(AUTH_PATH.MENU+`/${params.menuId}`, params);
}

/** 메뉴 삭제 API */
function $deleteMenu(menuId) {
  return apiAuth.delete(AUTH_PATH.MENU+`/${menuId}`);
}

export { $getMenu, $getMenuDetail, $createMenu, $updateMenu, $deleteMenu };
