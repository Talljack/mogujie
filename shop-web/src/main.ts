import 'babel-polyfill'
import Vue from 'vue';
import App from './App.vue';
import 'lib-flexible';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import router from './router';
import store from './store';
import './assets/style/index.scss';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  loading: require('./assets/image/default.png')
})
// @ts-ignore
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
