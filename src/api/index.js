import axios from "axios";
import { setInterceptors } from "@/api/interceptors";

/**
 * Axios 설정
 */

// 인정필요없는 요청
const $axios = function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: "http://192.168.0.8:9090/api/",
  });
};

const $axiosWithAuth = function createdInstance() {

  // interceptor로 token 셋팅
  return setInterceptors(axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  }));
}

export const apiNonAuth = $axios();
export const apiAuth = $axiosWithAuth();
