/**
 * @desc 多页显示
 * @author tingxia
 * @email tingxia@live.com
 */
import { install, _Vue } from './install';
import loader from './loader';

export default class MuPage {
  static install = null;
  static version = null;

  _vm = null; // 根组件
  _apps = {}; // 组件实例
  _components = {}; // 组件
  _muPageInfos = {}; // 消息
  _current = null; // 当前页
  _visitedViews = []; // 打开页
  _homePage = null; // 主页
  _errorPage = null;

  constructor(options = {}) {
    this._apps = {};
    this._errorPage = options.errorPage || null;
    this._current = null;
    this._visitedViews = [];
    this._components = {};
    this._muPageInfos = {};
    if (options.components && typeof options.components === 'object') {
      let components = options.components;
      for(let key in components) {
        if (components.hasOwnProperty(key)) {
          this._components[key] = {
            name: key,
            component: loader(components[key], this._errorPage, key),
            key: makeKey(key)
          };
          this._muPageInfos[key] = {
            name: key,
            data: null
          }
        }
      }
    } else {
      console.warn('[muPage error] no component register!')
    }
    if (options.homePage) {
      this._homePage = this._components[options.homePage]
    } else {
      this._homePage = null
    }
    if (_Vue) {
      this._vm = new _Vue({
        data: {
          $$muPage: this
        }
      });
    }
    if (this._homePage) {
      this.openHomePage()
    }
    if (window) {
      window.$muPage = this
    }
  }

  get current() {
    return this._current
  }

  get homePage() {
    return this._homePage
  }

  get visitedViews() {
    return this._visitedViews
  }

  get apps() {
    return this._apps
  }

  getInfo(app) {
    if (app) {
      let name = app.$options.name;
      if (name && this._apps.hasOwnProperty(name) && this._muPageInfos.hasOwnProperty(name)) {
        return this._muPageInfos[name] || {name: name, data: null}
      }
    }
    return {name: null, data: null}
  }

  isRegister(name) {
    if (!name || name.trim() === '') {
      return false
    }
    return Boolean(this._components && this._components[name])
  }

  init(name, app) {
    if (process.env.NODE_ENV !== 'production' && !install.installed) {
      throw new Error(`[muPage Error] not installed. Make sure to call \`Vue.use(MuPagePlugin)\` ` +
        `before creating root instance.`)
    }
    this._apps[name] = app
  }

  close(name) {// 关闭页面
    if (!name) {
      if (!this.current) {
        return
      }
      name = this._current.name
    }
    if (this._homePage && this._homePage.name === name) {
      return
    }
    if (name === '*') {
      for (let key in this._muPageInfos) {
        if (this._homePage && key === this._homePage.name){
          continue
        }
        if(this._muPageInfos.hasOwnProperty(key)) {
          this.removeInstance(key);
          this._muPageInfos[key].data = null
        }
      }
      this._visitedViews.splice(0, this._visitedViews.length);
      this._current = this._homePage || null
    } else {
      if (!this._visitedViews.some(v => v.name === name)) {
        return
      }
      for (let [index, v] of this._visitedViews.entries()) {
        if (name === v.name) {
          this._visitedViews.splice(index, 1);
          if (name === this._current.name) {
            // 打开相邻页
            if ((index -1) > -1) {
              this._current = this._visitedViews[index - 1]
            } else if (index < this._visitedViews.length) {
              this._current = this._visitedViews[index]
            } else {
              if (this._homePage) {
                this._current = this._homePage
              } else {
                this._current = null
              }
            }
          }
          // 清除数据
          this.removeInstance(name);
          this._muPageInfos[name].data = null
        }
      }
    }
  }

  closeOther() {
    if (!this._current) {
      return
    }
    if (this._homePage && this._current.name === this._homePage.name) {
      this._visitedViews.splice(0, this._visitedViews.length)
    }
    this._visitedViews = this._visitedViews.filter(v => v.name === this._current.name);
    let homePageName = this._homePage && this._homePage.name;
    for (let key in this._muPageInfos) {
      if (key === this.current.name || key === homePageName){
        continue
      }
      if(this._muPageInfos.hasOwnProperty(key)) {
        this.removeInstance(key);
        this._muPageInfos[key].data = null
      }
    }
  }
  // 显示界面，不刷新已有界面
  open(name) {
    if (name) {
      if (this._homePage && name === this._homePage.name) {
        this._current = this._homePage;
        return
      }
      if (this._visitedViews.some(v => v.name === name)) {
        this._visitedViews.forEach(v => {
          if (v.name === name) {
            this._current = v
          }
        })
      } else {
        if (this._components[name]) {
          let view = this._components[name];
          this._visitedViews.push(view);
          this._current = view
        } else {
          throw new Error(`[muPage error] component ${name} not register!`)
        }
      }
    } else {
      if (this._homePage) {
        this.openHomePage(this._muPageInfos[this._homePage.name].data, false)
      }
    }
  }

  // 显示界面， 刷新已有的
  push(name, data) { // 组件切换
    if (!name) {
      this.openHomePage(data)
    } else {
      if (this._homePage && name === this._homePage.name) {
        this.removeInstance(name);
        let muPageInfo = this._muPageInfos[name];
        if(muPageInfo) {
          muPageInfo.data = data || null
        }
        this._current = this._homePage;
        return
      }
      if(this._visitedViews.some(v => v.name === name)) {
        this._visitedViews.forEach(v => {
          if (v.name === name) {
            this.removeInstance(name);
            let muPageInfo = this._muPageInfos[name];
            if(muPageInfo) {
              muPageInfo.data = data || null
            }
            this._current = v
          }
        });
      } else {
        if (!this._components[name]) {
          throw new Error('[muPage error] component '+ name +' not register!')
        }
        let view = this._components[name];
        this._muPageInfos[name] && (this._muPageInfos[name].data = data || null);
        this._visitedViews.push(view);
        this._current = view
      }
    }
  }

  openHomePage(data) {
    if (this._homePage) {
      if (data) {
        this.push(this._homePage.name, data)
      } else {
        this.open(this._homePage.name)
      }
    } else {
      throw new Error('[muPage error] not found home page!')
    }
  }

  destroy(name) {
    // 双保险
    if (name && this._apps[name]) {
      this._apps[name] = null;
      this._muPageInfos[name].data = null
    }
  }

  removeInstance(name) {
    if (!name) {return}
    let app = this._apps[name];
    if (app) {
      app.$destroy();
      this._apps[name] = null;
    }
  }
}

// 统一key格式
const makeKey = (name) => {
  return 'muPage-'+ name + '-' + 'tx'
};

MuPage.install = install;
MuPage.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MuPage);
}