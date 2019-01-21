import Vue from 'vue'
import App from './App.vue'
import MuPage from './index.js'
import errorPage from './components/error.vue'

Vue.config.productionTip = false;
Vue.use(MuPage);
const muPage = new MuPage({components: {
  test1: 'testViews/test1.vue',
  test2: 'testViews/test2.vue',
  test3: 'testViews/test3.vue',
  test4: 'testViews/test4.vue',
  test5: 'testViews/test5.vue'
}, homePage: 'test1', errorPage: errorPage});
new Vue({
  muPage,
  render: h => h(App),
}).$mount('#app');
