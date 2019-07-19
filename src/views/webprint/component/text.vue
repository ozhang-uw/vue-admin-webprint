<template>
  <div class="text-container">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  // 通过props与父组件通讯
  props: {
    childData: {
      type: String,
      default: 'msg'
    }
  },

  data() {
    return {
      msg: ''
    }
  },

  created() {
    this.msg = '{{ ' + this.childData + ' }}'
  }
}
</script>

<style scoped>
  .text-container{
    position: absolute;
    border: 1pt solid black;
    box-sizing: border-box;
  }

  span {
    position: relative;
    z-index: -1;
  }
</style>
