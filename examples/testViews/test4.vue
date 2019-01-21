<template>
  <div id="app">
    <mu-page-link to="test5" me="open"> 打开 test5 页面</mu-page-link>
    <mu-page-link to="test5" me="push" data="来访者 test4"> 跳转到 test5 页面</mu-page-link>
    <div><span>传递内容:</span>{{$muPageInfo.data}}</div>
  </div>
</template>

<script>

export default {
  name: 'test4'
}
</script>