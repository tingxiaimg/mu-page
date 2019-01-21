/**
 * @desc 组件加载方法
 * @author tingxia
 * @email tingxia@live.com
 */
import error from './components/error.vue'

export default function loader (file, errorPage = error, name) {
  if (!file) {
    let error = new Error(`[muPage error] page ${name} not found !`);
    return errorPage
  }
  if (process.env.NODE_ENV === 'development') {
    let component = require(`@/${file}`).default;
    if (name) {
      component.name = name
    }
    component.beforeCreate.push(bl(component.name));
    return component
  } else if (process.env.NODE_ENV === 'production') {
    if (!errorPage) {
      errorPage = error
    }
    return () => new Promise((resolve, reject) => {
      import(`@/${file}`).then(mo => {
        let component = mo.default;
        if (name) {
          component.name = name
        }
        if (component.beforeCreate) {
          let bf = component.beforeCreate;
          let blf = bl(component.name);
          component.beforeCreate = function () {
            blf.bind(this)();
            bf.bind(this)();
          }
        } else {
          component.beforeCreate = bl(component.name)
        }
        resolve(mo)
      }).catch(error => {
        console.error(`[muPage error] page ${name} not found !\n` + error);
        resolve(errorPage)
      })
    })
  }
}

function bl (name) {
  return function () {
    if (this.$muPage) {
      this.$muPage.init(name, this)
    }
  }
}