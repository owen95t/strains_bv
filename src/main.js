import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {NavbarPlugin} from 'bootstrap-vue';
import IconsPlugin from 'bootstrap-vue';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(NavbarPlugin)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
