<template>
  <div id="app">
    <mu-page-link to="test3" me="open"> 打开 test3 页面</mu-page-link>
    <mu-page-link to="test3" me="push" data="来访者 test2"> 跳转到 test3 页面</mu-page-link>
    <div><span>传递内容:</span>{{$muPageInfo.data}}</div>
    <div><span>收到消息:</span>{{message}}</div>
    <mu-page-link me="open" :to="$muPage.homePage.name">
      <div style="background-color: #aff1ff; width: 80px;height: 60px">{{$muPage.homePage.name}}</div>
    </mu-page-link>
    <button @click="$muPage.openHomePage()">主页</button>
  </div>
</template>

<script>

export default {
  name: 'test2',
  data (){
    return {
      message: ''
    }
  },
  methods:{
    handleMuMessage(me){
      this.message = me.sender.$options.name + ':' + me.message;
      return `test2[${new Date()}]: hello ${me.sender.$options.name}`
    }
  }
}
</script>
