/**
 * @desc 组件加载方法
 * @author tingxia
 * @email tingxia@live.com
 */
import error from './components/error.vue'

export default function loader (file, errorPage = error, name) {
  if (!errorPage) {
    errorPage = error
  }
  if (!file) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`[muPage error] page ${name} not found !`);
    } else {
      return errorPage
    }
  }
  if (typeof file === 'string') {
    return fileLoad(file, errorPage, name)
  } else if (file instanceof Promise) {
    return promiseLoad(file, errorPage, name)
  } else if (typeof file === 'object') {
    if (file.default) {
      return objectLoad(file.default, name)
    } else {
      return objectLoad(file, name)
    }
  } else {
    return errorPage
  }
}

function fileLoad(path, errorPage = error, name) {
  if (process.env.NODE_ENV === 'development') {
    let component = require(path).default;
    return objectLoad(component, name)
  } else { // process.env.NODE_ENV === 'production'
    return promiseLoad(import(path), errorPage, name)
  }
}

function objectLoad(ob, name) {
  if (name) {
    ob.name = name
  }
  return ob
}

function promiseLoad(pro, errorPage = error, name) {
  return () => new Promise((resolve, reject) => {
    pro.then(mo => {
      let component = mo.default;
      if (name) {
        component.name = name
      }
      resolve(mo)
    }).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        reject(error)
      } else {
        console.error(`[muPage error] page ${name} not found !\n` + error);
        resolve(errorPage)
      }
    })
  })
}

function bl (name) {
  return function () {
    if (this.$muPage) {
      this.$muPage.init(name, this)
    }
  }
}