import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes/index'
import "@/plugins/vee-validate";  //검증 플러그인

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
