<template>
  <div id="app">
    <mu-page-link to="test1" me="open"> 打开 test1 页面</mu-page-link>
    <mu-page-link to="test1" me="push" data="来访者 test5"> 跳转到 test1 页面</mu-page-link>
    <div><span>传递内容:</span>{{$muPageInfo.data}}</div>
  </div>
</template>

<script>

export default {
  name: 'test5'
}
</script>
