<template>
  <div id="temp">
    <div id="print-button">
      <el-button @click="onPrint">打印</el-button>
    </div>
    <div id="print-container">
      <div id="activity-name">
        <span class="print-title">活动名称&emsp;&emsp;</span>
        <span class="print-title">{{ nameMessage }}</span>
      </div>

      <div id="activity-region">
        <span class="print-title">活动地区</span>
        <br> <br>
        <span class="print-content">{{ regionMessage }}</span>
      </div>

      <div id="activity-date1">
        <span class="print-title">开始日期&emsp;</span>
        <span class="print-content">{{ date1Message }}</span>
      </div>

      <div id="activity-date2">
        <span class="print-title">开始时间&emsp;</span>
        <span class="print-content">{{ date2Message }}</span>
      </div>

      <div id="activity-delivery">
        <span class="print-title">立即提交</span>
        <br> <br>
        <span class="print-content">{{ deliveryMessage }}</span>
      </div>

      <div id="activity-type">
        <span class="print-title">活动类型</span>
        <br> <br>
        <span class="print-content">{{ typeMessage }}</span>
      </div>

      <div id="resources">
        <span class="print-title">资源</span>
        <br> <br>
        <span class="print-content">{{ resourcesMessage }}</span>
      </div>

      <div id="activity-desc">
        <span class="print-title">其它</span>
        <br> <br>
        <span class="print-content">{{ descMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import printJS from 'print-js'

export default {
  data() {
    return {
      nameMessage: !this.$route.query.name ? ' ' : this.$route.query.name,
      regionMessage: !this.$route.query.region ? ' ' : this.$route.query.region,
      date1Message: !this.$route.query.date1 ? ' ' : this.$route.query.date1,
      date2Message: !this.$route.query.date2 ? ' ' : this.$route.query.date2,
      deliveryMessage: !this.$route.query.delivery ? ' ' : this.$route.query.delivery,
      typeMessage: !this.$route.query.type ? ' ' : this.$route.query.type.toString().split(',').join(', '),
      resourcesMessage: !this.$route.query.resources ? ' ' : this.$route.query.resources,
      descMessage: !this.$route.query.desc ? ' ' : this.$route.query.desc
    }
  },

  methods: {
    onPrint() {
      // window.print()
      const contentStr = document.getElementById('print-container').innerHTML
      const oldContentStr = document.body.innerHTML
      document.body.innerHTML = contentStr

      window.print()
      document.body.innerHTML = oldContentStr
      window.location.reload()
      /*
      printJS({
        printable: 'print-container',
        type: 'html',
        ignoreElements: ['print-button'],
        targetStyles: ['*']
      })
      */
    }
  }
}
</script>

<style>
@media print{
  @page {
    size: 210mm 160mm;
    margin: 0mm;
  }
}

#temp{
  margin: 2mm;
}

#print-button{
  position: absolute;
  left: 210mm;
}

.print-content{
  font-size:12pt;
}

.print-title{
  font-size:18pt;
}

/*
#print-container{
    font: 12pt arial,"黑体";
    width: 206mm;
    height: 293mm;
    border: 1pt dotted #000000;
}
*/

#activity-name{
  width: 206mm;
  height: 30mm;
  position: absolute;
  top: 0mm;
  left: 0mm;
  margin: 2mm;
  padding: 2mm;
  border: 1px dotted #000000;
}

#activity-region{
  width: 103mm;
  height: 30mm;
  position: absolute;
  top: 30mm;
  left: 0mm;
  margin: 2mm;
  padding: 2mm;
  border-left: 1px dotted #000000;
  border-bottom: 1px dotted #000000;
}

#activity-date1{
  width: 103mm;
  height: 15mm;
  position: absolute;
  top: 30mm;
  left: 103mm;
  margin: 2mm;
  padding:2mm;
  border-left: 1px dotted #000000;
  border-right: 1px dotted #000000;
}

#activity-date2{
  width: 103mm;
  height: 15mm;
  position: absolute;
  top: 45mm;
  left: 103mm;
  padding:2mm;
  margin: 2mm;
  border-left: 1px dotted #000000;
  border-right: 1px dotted #000000;
  border-bottom: 1px dotted #000000;
}

#activity-delivery{
  width: 51.5mm;
  height: 30mm;
  position: absolute;
  top: 60mm;
  left: 0mm;
  padding:2mm;
  margin: 2mm;
  border-left: 1px dotted #000000;
}

#activity-type{
  width: 103mm;
  height: 30mm;
  position: absolute;
  top: 60mm;
  left: 103mm;
  padding:2mm;
  margin: 2mm;
  border-left: 1px dotted #000000;
  border-right: 1px dotted #000000;
}

#resources{
  width: 51.5mm;
  height: 30mm;
  position: absolute;
  top: 60mm;
  left: 51.5mm;
  padding:2mm;
  margin: 2mm;
  border-left: 1px dotted #000000;
}

#activity-desc{
  width: 206mm;
  height: 60mm;
  position: absolute;
  top: 90mm;
  left: 0mm;
  padding:2mm;
  margin: 2mm;
  border: 1px dotted #000000;
}
</style>
