import Vue from 'vue'
import App from './App.vue'
import MuPage from '../src/index.js'
import errorPage from '../src/components/error.vue'

Vue.config.productionTip = false;
Vue.use(MuPage);
const muPage = new MuPage({components: {
  test1: import('./testViews/test1.vue'),
  test2: import('./testViews/test2.vue'),
  test3: import('./testViews/test3.vue'),
  test4: import('./testViews/test4.vue'),
  test5: import('./testViews/test5.vue')
}, homePage: 'test1', errorPage: errorPage});
new Vue({
  muPage,
  render: h => h(App),
}).$mount('#app');
