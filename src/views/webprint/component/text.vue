<template>
  <div class="text-container">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
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
    width: 10mm;
    height: 10mm;
    border: 1pt solid red;
    box-sizing: border-box;
  }
</style>
