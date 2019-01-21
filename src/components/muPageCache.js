/**
 * 页面缓存组件
 * @author tingxia
 * @email tingxia@live.com
*/
import {getComponentName, isDef} from '../utils'

function isAsyncPlaceholder (node){
  return node.isComment && node.asyncFactory
}

function getFirstComponentChild (children){
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

export default {
  name: 'MuPageCache',
  abstract: true,

  render () {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions && this.$muPage) {
      const name = getComponentName(componentOptions);
      if (name) {
        if (this.$muPage.apps[name]) {
          vnode.componentInstance = this.$muPage.apps[name];
        }
        if (this.$muPage.isRegister(name)) {
          vnode.data.keepAlive = true
        }
      }
    }
    return vnode || (slot && slot[0])
  }
}
