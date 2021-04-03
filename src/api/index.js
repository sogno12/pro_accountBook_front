import axios from "axios";
import { setInterceptors } from "@/api/interceptors";
import qs from "qs";

/**
 * Axios 설정
 */

// 인정필요없는 요청
const $axios = function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: "http://192.168.0.8:9091/api/",
    // paramsSerializer: axios.get을 통해 배열을 파라미터로 전공하면 []가 붙으므로 없애버리는 과정
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

const $axiosWithAuth = function createdInstance() {

  // interceptor로 token 셋팅
  return setInterceptors(
    axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    })
  );
}



export const apiNonAuth = $axios();
export const apiAuth = $axiosWithAuth();
