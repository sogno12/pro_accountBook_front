/**
 * 메뉴 관리 API
 */

import { apiNonAuth } from "@/api/index";

const AUTH_PATH = {
    MENU: "up/menu", // 메뉴 API
};

// 메뉴 Get API
function $getMenu() {
    return apiNonAuth.get(AUTH_PATH.MENU);
}

export { $getMenu };