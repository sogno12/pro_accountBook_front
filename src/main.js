import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
import router from '@/routes/index'
import store from '@/stores/index'
import "@/plugins/vee-validate";  //검증 플러그인
import VueCryptojs from "vue-cryptojs"; //암호화 플러그인 vue-cryptojs (https://www.npmjs.com/package/vue-cryptojs)

Vue.config.productionTip = false
Vue.use(VueCryptojs);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
