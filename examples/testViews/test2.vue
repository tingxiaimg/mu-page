<template>
  <div id="app">
    <mu-page-link to="test3" me="open"> 打开 test3 页面</mu-page-link>
    <mu-page-link to="test3" me="push" data="来访者 test2"> 跳转到 test3 页面</mu-page-link>
    <div><span>传递内容:</span>{{$muPageInfo.data}}</div>
  </div>
</template>

<script>

export default {
  name: 'test2'
}
</script>
