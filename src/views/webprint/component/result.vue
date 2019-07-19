<template>
  <div class="container">
    <div id="content">
      <div id="contentStyle" v-html="defaultStyle" />
      <div id="preview" v-html="content" />
      <div id="scriptContent" v-html="vueScript" />
    </div>
    <el-col :span="4">
      <el-input v-model="pageSize.width" type="primary" placeholder="宽" />
    </el-col>
    <el-col :span="2">
      <p>mm</p>
    </el-col>
    <el-col :span="4">
      <el-input v-model="pageSize.height" type="primary" placeholder="高" />
    </el-col>
    <el-col :span="2">
      <p>mm</p>
    </el-col>
    <el-button type="primary" @click="onDownload()">下载</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: decodeURI(this.$route.params.content),
      defaultStyle: '<style type=\"text/css\">.text-container{position: absolute;' +
                    'border: 1pt solid black;box-sizing: border-box;}</style>' +
                    '<style type=\"text/css\">.line-container{position: absolute;' +
                    'box-sizing: border-box;}body{margin:0;padding:0;}@media print{@page{margin:0;}}</style>',
      vueScript: '<script>var app = new Vue({' +
                           'el: \'#canvas\', ' +
                           'data: { ' +
                  decodeURI(this.$route.params.vueScript) +
                 '} })<\/script>',
      pageSize: {
        width: '',
        height: ''
      }
    }
  },

  methods: {
    onDownload() {
      if (!this.pageSize.width) return false

      // 提出网页的内容
      const styleStr = document.getElementById('contentStyle').innerHTML
      const contentStr = document.getElementById('preview').innerHTML
      const scriptStr = document.getElementById('scriptContent').innerHTML

      // 将px单位转换成mm单位
      const regexFilter = /[0-9]+(px;)/g
      let replaced = ''
      let start = 0
      let match, lastIndex, firstIndex, ratio
      // 找到所有px单位的数字
      while ((match = regexFilter.exec(contentStr)) != null) {
        lastIndex = regexFilter.lastIndex
        firstIndex = lastIndex - match[0].length
        replaced += contentStr.substring(start, firstIndex)
        // 通过用户设置的纸张大小来计算对比率 并计算出换算过的值 保留一位小数
        if (start === 0) {
          ratio = parseFloat(this.pageSize.width) / parseFloat(getComputedStyle(document.getElementById('canvas'), null)['width'])
        }
        const converted = Math.round((parseFloat(match) * ratio * 10)) / 10 + 'mm;'
        replaced += converted
        start = lastIndex
      }
      replaced += contentStr.substring(start)

      document.body.innerHTML = replaced + scriptStr
      document.head.innerHTML = styleStr + '<script src="https://cdn.jsdelivr.net/npm/vue"><\/script>'
    }
  }
}
</script>
