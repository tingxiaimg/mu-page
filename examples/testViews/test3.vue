<template>
  <div id="app">
    <mu-page-link to="test4" me="open"> 打开 test4 页面</mu-page-link>
    <mu-page-link to="test4" me="push" data="来访者 test3"> 跳转到 test4 页面</mu-page-link>
    <div><span>传递内容:</span>{{$muPageInfo.data}}</div>
  </div>
</template>

<script>

export default {
  name: 'test3'
}
</script>
