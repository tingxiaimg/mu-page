<template>
  <div id="app">
    <div class="v-left color-border">
      <div style="padding: 25px 0"></div>
      <div class="mu-button" @click="open('test1')">TEST1</div>
      <div class="mu-button" @click="open('test2')">TEST2</div>
      <div class="mu-button" @click="open('test3')">TEST3</div>
      <div class="mu-button" @click="open('test4')">TEST4</div>
      <div class="mu-button" @click="open('test5')">TEST5</div>
      <div class="mu-button" @click="closeOther()">CLOSE OTHER</div>
      <div class="mu-button" @click="close('*')">CLOSE ALL</div>
    </div>
    <div class="v-right color-border">
      <div class="t">
        <div class="tab"><mu-page-link me="open" :to="$muPage.homePage.name">{{$muPage.homePage.name}}</mu-page-link></div>
        <div v-for="(v, k, i) in visitedViews" :key="i" class="tab">
          <mu-page-link me="open" :to="v.name">{{v.name}}</mu-page-link>
        </div>
      </div>
      <div class="b"><mu-page/></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    computed: {
      visitedViews() {
        return this.$muPage.visitedViews
      }
    },
    methods: {
      close(name) {
        this.$muPage.close(name)
      },
      closeOther() {
        this.$muPage.closeOther();
      },
      open(name) {
        this.$muPage.open(name);
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 15px;
    background-color: #f2f2f2;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: row;
  }
  #app .v-left{
    width: 200px;
    margin-right: 15px;

  }

  #app .v-right{
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  #app .v-right .t{
    height: 45px;
    margin-top: 15px;
    border-bottom: 2px solid #b3b3b3;
  }

  .t .tab{
    margin: 5px 25px;
    display: inline-block;
    min-width: 40px;
    padding: 4px;
    border: 2px solid #c0c0c0;
    user-select: none;
  }

  #app .v-right .b{
    flex: 1;
    padding: 0 15px;
  }

  .mu-button{
    user-select: none;
    cursor: pointer;
    min-height: 20px;
    margin: 5px 10px;
    padding: 5px;
    border: 2px solid #c0c0c0;
    border-radius: 15px;
  }

  .mu-button:hover, .tab:hover{
    border-color: #9fdbe9;
  }

  .mu-button:active, .tab:active{
    border-color: #aff1ff;
  }

  .color-border{
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #d0d0d0;
    transition-delay: 20ms;
    background-color: #f9f9f9;
  }

  .color-border:hover{
    box-shadow: 3px 3px 15px #c2c2c2;
  }
</style>
