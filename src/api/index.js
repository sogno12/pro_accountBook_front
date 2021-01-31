import axios from "axios";

/**
 * Axios 설정
 */

// 인정필요없는 요청
const $axios = function createInstance() {
  return axios.create({
    // baseURL: process.env.APP_API_URL,
    baseURL: "http://192.168.0.6:9090/api/",
  });
};

export const apiNonAuth = $axios();
