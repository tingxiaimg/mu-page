import Vue from 'vue'
import App from './App.vue'
import MuPage from '../src/index.js'
import errorPage from '../src/components/error.vue'

Vue.config.productionTip = false;
Vue.use(MuPage);
const muPage = new MuPage({components: {
  test1: import('./views/test1.vue'),
  test2: import('./views/test2.vue'),
  test3: import('./views/test3.vue'),
  test4: import('./views/test4.vue'),
  test5: import('./views/test5.vue')
}, homePage: 'test1', errorPage: errorPage});
new Vue({
  muPage,
  render: h => h(App),
}).$mount('#app');
