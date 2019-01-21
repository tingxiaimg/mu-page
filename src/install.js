/**
 * @desc muPage vue插件安装函数
 * @author tingxia
 * @email tingxia@live.com
 */
import View from './components/muPage'
import Link from './components/muPageLink'

export let _Vue;

export function install (Vue) {
  if (install.installed && _Vue === Vue) return;
  install.installed = true;

  _Vue = Vue;

  Vue.mixin({
    beforeCreate () {
      if (this.$options.muPage) {
        this._muPageRoot = this;
        this._muPage = this.$options.muPage;
      } else {
        this._muPageRoot = (this.$parent && this.$parent._muPageRoot) || this
      }
    },
    destroyed () {
      if (this._muPageRoot && this._muPageRoot._muPage) {
        this._muPageRoot._muPage.destroy(this.$options.name)
      }
    }
  });

  Object.defineProperty(Vue.prototype, '$muPage', {
    get () { return this._muPageRoot._muPage }
  });

  Object.defineProperty(Vue.prototype, '$muPageInfo', {
    get () {
      return this._muPageRoot._muPage.getInfo(this)
    }
  });

  Vue.component('mu-page', View);
  Vue.component('mu-page-link', Link);
}