<template>
  <div id="app">
    <div>
      <mu-page-link me="open" to="test1">test1</mu-page-link>
      <mu-page-link me="open" to="test2">test2</mu-page-link>
      <mu-page-link me="open" to="test3">test3</mu-page-link>
      <mu-page-link me="open" to="test4">test4</mu-page-link>
      <mu-page-link me="open" to="test5">test5</mu-page-link>
    </div>
    <div>
      <mu-page-link to="test1" :data="'test1当前时间是' + Date.now()">test1</mu-page-link>
      <mu-page-link to="test2" :data="'test2当前时间是' + Date.now()">test2</mu-page-link>
      <mu-page-link to="test3" :data="'test3当前时间是' + Date.now()">test3</mu-page-link>
      <mu-page-link to="test4" :data="'test4当前时间是' + Date.now()">test4</mu-page-link>
      <mu-page-link to="test5" :data="'test5当前时间是' + Date.now()">test5</mu-page-link>
    </div>
    <div>
      <span @click="close('test1')">关闭test1(主页无法关闭)</span>
      <span @click="close('test2')">关闭test2</span>
      <span @click="close('test3')">关闭test3</span>
      <span @click="close('test4')">关闭test4</span>
      <span @click="close('test5')">关闭test5</span>
      <span @click="closeOther">关闭其它</span>
      <span @click="close('*')">关闭所有</span>
    </div>
    <div>
      <span>打开页面：</span>
      <span v-for="item in visitedViews">{{item.name}}</span>
    </div>
    <div style="background-color: #cccccc; border: 1px solid #4cce72">
      <mu-page/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {
    visitedViews () {
      return this.$muPage.visitedViews
    }
  },
  methods: {
    close (name) {
      this.$muPage.close(name)
    },
    closeOther () {
      this.$muPage.closeOther();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  span {
    margin: 0 5px;
    cursor: pointer;
  }
</style>
