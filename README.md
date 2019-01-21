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
* 导入
```javascript
import muPage from 'mu-page'
```
* 在vue中使用
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
* App.vue
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

#### &lt;mu-page&gt;  
页面显示组件，打开的页面通过此组件显示。
#### &lt;mu-page-link&gt;  
页面打开组件，可通过该组件打开页面

| 属性 | 参数 | 说明 |
|:---|----|----| 
|to|&lt;string&gt;|要跳转的页面名称| 
|me|&lt;string&gt;|跳转方式 open或push(默认 push)| 
|data|&lt;string&gt;|要传递的数据，push有效| 

### 构造参数

| 名称 | 类型 | 说明 |
|:---|----|----|
|components|&lt;object&gt;|注册页面 页面名-页面路径|
|homePage|&lt;string&gt;|主页名|
|errorPage|&lt;object&gt;|错误页面 vue组件|
### 实例方法

| 名称 | 参数 | 返回值 | 说明 |
|:---|----|----| ---- |
|open|&lt;string&gt;|&lt;void&gt;|打开页面，不刷新已打开的。|
|push|&lt;string&gt;, &lt;any&gt;|&lt;void&gt;|打开页面，刷新已打开的。|
|close|&lt;string&gt;|&lt;void&gt;|关闭页面，*关闭所有（主页不会被关闭）|
|closeOther|&lt;string&gt;|&lt;void&gt;|关闭除当前与主页外页面。|

### 实例属性

| 名称 | 类型 | 说明 |
|:---|----| ---- |
|visitedViews|&lt;array&gt;|打开页面。|
|homePage|&lt;string&gt;|主页。|
|current|&lt;object&gt;|当前页|

### vue实例注入属性

* $muPage muPage实例
* $muPageInfo muPage信息，包含通过push传递过来的值(data属性中)

