import store from '@/stores/index'
import router from "@/routes/index";
import { AUTH_RST_CO } from '@/api/auth';
import { UP_PAGE } from "@/js/const";

export function setInterceptors(instance) {
    // Request 인터셉터
    // 1. Header에 토큰 값
    instance.interceptors.request.use(
        config => {
            config.headers = {
              Authorization: store.getters["auth/getAccessToken"],
            };
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // Response 인터셉터
    instance.interceptors.response.use(
        (response) => {
            // 인증 완료 되면 바로 넘김
            return response;
        },
        async (error) => {
            // 인증 실패시
            // 1. 에러코드 확인
            const status = error.response.status;
            if (AUTH_RST_CO.UNAUTHORIZED === status) { // 401
                // TODO 1_1. 401 에러인증 정보 초기화
                console.log("401");
                store.dispatch("auth/initAuthorization");
                router.push(UP_PAGE.LOGIN).catch(() => {});
            }
            console.log("무조건 에러");
            return Promise.reject(error);
        }
    );
    return instance;
}