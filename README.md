# mu-page

## 构建工程
```
npm install
```

### 运行样例
```
npm run serve
```

### 构建插件
```
npm run build:lib
```

### 使用
``` javascript
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
```
``` vue
<template>
  <div id="app">
    <mu-page/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

```

### 组件

#### <mu-page>  
页面显示组件，打开的页面通过此组件显示。
#### <mu-page-link>  
页面打开组件，可通过该组件打开页面

| 属性 | 参数 | 说明 |
|:---|----|----| 
|to|<string>|要跳转的页面名称| 
|me|<string>|跳转方式 open或push(默认 push)| 
|data|<string>|要传递的数据，push有效| 

### 构造参数

| 名称 | 类型 | 说明 |
|:---|----|----|
|components|<object>|注册页面 页面名-页面路径|
|homePage|<string>|主页名|
|errorPage|<object>|错误页面 vue组件|
### 实例方法

| 名称 | 参数 | 返回值 | 说明 |
|:---|----|----| ---- |
|open|<string>|<void>|打开页面，不刷新已打开的。|
|push|<string>, <any>|<void>|打开页面，刷新已打开的。|
|close|<string>|<void>|关闭页面，*关闭所有（主页不会被关闭）|
|closeOther|<string>|<void>|关闭除当前与主页外页面。|

### 实例属性

| 名称 | 类型 | 说明 |
|:---|----| ---- |
|visitedViews|<array>|打开页面。|
|homePage|<string>|主页。|
|current|<object>|当前页|

### vue实例注入属性

* $muPage muPage实例
* $muPageInfo muPage信息，包含通过push传递过来的值(data属性中)

