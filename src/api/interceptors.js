import store from '@/stores/index'

export function setInterceptors(instance) {
    // Add a request interceptor
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

    // Add a response interceptor
    instance.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            return Promise.reject(error);
        }
    );
    return instance;
}