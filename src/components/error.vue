<template>
    <div class="notfound-wrap">
        <div class="content">
            <div class="title"><span>404</span>页面不存在！</div>
            <div class="sub">{{error.message}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'error',
    data() {
      return {
        error: {message: '页面加载错误，请联系网站管理员！'}
      }
    }
  }
</script>

<style scoped>
    .notfound-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-80px);
    }

    .notfound-wrap .content {
        text-align: right;
    }

    .notfound-wrap .content .title {
        -webkit-font-smoothing: antialiased;
        color: #73b99a;
        font-size: 100px;
    }

    .notfound-wrap .content span .title {
        font-size: 240px;
    }

    .notfound-wrap .content .sub {
        font-size: 30px;
        color: #ccc;
        padding-bottom: 50px;
    }
</style>
