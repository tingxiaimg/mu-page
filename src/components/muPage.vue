<template>
  <section class="mu-page-main" :style="pageStyle">
    <transition name="mu-page" mode="out-in">
      <mu-page-cache v-if="current">
        <component :is="current.component"></component>
      </mu-page-cache>
    </transition>
  </section>
</template>

<script>
  import Cache from './muPageCache'

  export default {
    name: 'MuPage',
    computed: {
      current() {
        return this.$muPage.current
      }
    },
    components: {
      'mu-page-cache': Cache
    },
    props: {
      pageStyle: {
        type: Object,
        default () {return {}},
        required: false
      }
    }
  }
</script>
<style>
  .mu-page-main{
    width: calc(100% - 10px);
    height: 100%;
    padding: 5px;
    margin: 0;
    overflow: auto;
    min-width: 960px;
    min-height: 600px;
  }
  .mu-page-enter-active, .mu-page-leave-active {
    transition: opacity .3s;
  }
  .mu-page-enter, .mu-page-leave-to {
    opacity: 0;
  }
</style>