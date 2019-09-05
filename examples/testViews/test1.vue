<template>
  <div id="app">
    <mu-page-link to="test2" me="open"> 打开 test2 页面</mu-page-link>
    <mu-page-link to="test2" me="push" data="来访者 test1"> 跳转到 test2 页面</mu-page-link>
    <div><span>传递内容:</span>{{$muPageInfo.data}}</div>
    <label>
      <input type="text" name="send" v-model="sendMessage"/>
    </label>
    <button @click="send">send to text2</button>
    <button @click="openHomePage">主页</button>
  </div>
</template>

<script>

export default {
  name: 'test1',
  data() {
    return {
      sendMessage: ''
    }
  },
  methods: {
    send (){
      this.$muSend('test2', this.sendMessage);
    },
    openHomePage (){
      this.$muPage.openHomePage();
    }
  }
}
</script>
