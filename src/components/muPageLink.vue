<template>
    <i :class="showClass" @click="goto">
        <slot :value="to">
            <span >{{to || 'mu'}}</span>
        </slot>
    </i>
</template>
<script>
export default {
  name: 'MuPageLink',
  props: {
    to: {
      required: true,
      type: String,
      validator (value) {
        return value && value.trim() !== ''
      }
    },
    data: {
      required: false
    },
    me: {
      required: false,
      type: String,
      default: 'push'
    }
  },
  computed: {
    showClass () {
      return {
        'mu-page-link': true,
        'is-active': this.$muPage.current && (this.to === this.$muPage.current.name)
      }
    }
  },
  methods: {
    goto () {
      if(this.me && this.me === 'open') {
        this.$muPage.open(this.to)
      } else {
        this.$muPage.push(this.to, this.data)
      }

    }
  }
}
</script>
<style>
    .mu-page-link {
        display: inline;
        min-width: 10px;
        cursor: pointer;
        font-style: normal;
    }
    .mu-page-link:hover {
        color: #4cce72;
    }
    .is-active {
        color: #13ce66;
    }
</style>
