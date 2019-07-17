<template>
  <div class="content-container">
    <el-alert
      title="ID不能为空, 重复, 包括特殊符号，除下划线 _, 必须为英文字母"
      type="error"
      :closable="false"
      :style="alertStyle"
    />
    <div class="menu-interface">
      <el-form ref="form" :model="form" label-width="90px" size="mini">
        <el-form-item label="页面">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.pageSize" placeholder="大小" clearable />
            </el-col>
            <el-col :span="10">
              <el-input v-model="form.pagePadding" placeholder="边距" clearable />
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="20">
                <span>页面缩放 </span><el-switch v-model="form.pageResize" />
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="onPage">确认</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="创建文字框">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.textHeight" placeholder="高度" clearable />
            </el-col>
            <el-col :span="10">
              <el-input v-model="form.textWidth" placeholder="宽度" clearable />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.textSize" placeholder="字体大小" clearable />
            </el-col>
            <el-col :span="10">
              <el-input v-model="form.textID" placeholder="ID" clearable />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onCreateText('textChild')">确认</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="创建线条">
          <el-row>
            <el-col :span="8">
              <el-input v-model="form.lineLength" placeholder="长度" clearable />
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.lineBorder" placeholder="边框" clearable />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <span>横 </span><el-switch v-model="form.lineIsVertical" /><span> 竖</span>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onCreateLine('lineChild')">确认</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="图片选项">
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.inputImg" type="file" />
            </el-col>
            <el-col :span="6">
              <el-input v-model="form.imgOpacity" type="primary" placeholder="清晰度" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span>隐藏 </span><el-switch v-model="form.imgHide" @change="onImgHide" />
            </el-col>
            <el-col :span="10">
              <span>移动到背景 </span><el-switch v-model="form.imgBack" @change="onImgBack" />
            </el-col>
          </el-row>
          <el-row>
            <el-button-group>
              <el-button type="primary" :disabled="form.imgButton" @click="onImgSize()">页面大小一致</el-button>
              <el-button type="primary" :disabled="form.imgButton" @click="onImgOrig()">返回初始位置</el-button>
              <el-button type="primary" @click="onUpLoadImg()">载入</el-button>
            </el-button-group>
          </el-row>
        </el-form-item>
        <el-form-item label="网格">
          <el-col :span="10">
            <el-input v-model="form.gridSpacing" type="primary" placeholder="网格间距" clearable />
          </el-col>
          <el-col :span="10">
            <span>&emsp;隐藏 </span><el-switch v-model="form.gridHide" @change="onGridHide()" />
          </el-col>
          <el-col :span="4">
            <el-button ref="gridClick" type="primary" @click="onGridGenerate()">确认</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="元素等距">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.spacingDistance" type="primary" placeholder="间距" clearable />
            </el-col>
            <el-col :span="10">
              <span>&emsp;水平 </span><el-switch v-model="form.spacingIsVertical" /><span> 垂直</span>
            </el-col>
          </el-row>
          <el-row>
            <el-button-group>
              <el-button :type="form.selectType" @click="onEleSelect()">{{ form.selectMsg }}</el-button>
              <el-button type="primary" :disabled="form.selNotClearable" @click="onSelClear()">清空</el-button>
              <el-button type="primary" :disabled="form.selAppDisable" @click="onSpacing()">确认</el-button>
            </el-button-group>
          </el-row>
        </el-form-item>
        <el-form-item label="元素对齐">
          <el-col :span="20">
            <span>按下键盘v或h键并左键点击需要对齐的元素，</span>
            <span>松开后以点击的第一个元素为基准对齐。</span>
            <span>v为垂直对齐，h为水平对齐</span>
          </el-col>
        </el-form-item>
        <el-form-item label="删除上一个">
          <el-button type="primary" @click="onDeleteLast()">确认</el-button>
        </el-form-item>
        <el-form-item label="导出">
          <el-button type="primary" @click="onExport()">确认</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="graphic-interface" tabindex="100">
      <canvas id="drawingBoard" :style="pageStyle" :width="pageStyle.width" :height="pageStyle.height" />
      <img id="imgBlock" :src="imgSrc" :style="imgStyle" @mousedown="handleDrag($event, true)">
      <div id="canvas" :style="pageStyle" @contextmenu.prevent="handleResize($event, true, form.pageResize)">
        <component
          :is="item.component"
          v-for="item in items"
          :id="'component' + item.index"
          :key="item.index"
          :class="{selected: item.isSelected}"
          :child-data="item.dataID"
          :style="item.styleObject"
          @mousedown.native="handleDrag($event, false)"
          @contextmenu.prevent.native.stop="handleResize($event, false, true)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import textChild from './component/text.vue'
import lineChild from './component/line.vue'

// eslint-disable-next-line
let scriptContent = []
let textCounter = 0
let selectable = false
// eslint-disable-next-line
let selectedEle = []

export default {
  components: {
    textChild,
    lineChild
  },

  data() {
    return {
      pageStyle: {
        height: '300px',
        width: '400px',
        padding: '0px',
        'box-sizing': 'border-box'
      },
      imgStyle: {
        position: 'absolute',
        opacity: 0.5,
        display: 'inline',
        'z-index': 1
      },
      alertStyle: {
        display: 'none'
      },
      form: {
        pageSize: '',
        pagePadding: '',
        pageResize: false,
        textHeight: '',
        textWidth: '',
        textSize: '',
        textID: '',
        lineLength: '10mm',
        lineBorder: '4px solid red',
        lineIsVertical: false,
        inputImg: '',
        imgHide: false,
        imgOpacity: '',
        imgBack: false,
        imgButton: true,
        spacingIsVertical: false,
        spacingDistance: '',
        selAppDisable: true,
        selNotClearable: false,
        selectMsg: '选择',
        selectType: 'primary',
        gridSpacing: '',
        gridHide: false
      },
      items: [],
      imgSrc: ''
    }
  },

  created() {
    let vKeyDown = false
    let hKeyDown = false
    let alignList = []

    // handle Align
    document.onkeydown = () => {
      if (vKeyDown | hKeyDown) return null
      vKeyDown = window.event.keyCode === 86
      hKeyDown = window.event.keyCode === 72
      if (!(vKeyDown ^ hKeyDown)) return null
      document.onmousedown = () => {
        const id = window.event.target.id
        if (id.indexOf('component') < 0 | alignList.indexOf(id) >= 0) return null
        alignList.push(id)
      }

      document.onkeyup = () => {
        if (alignList.length > 1) handleAlign(alignList, vKeyDown)
        vKeyDown = false
        hKeyDown = false
        alignList = []
        document.onmousedown = null
        document.onkeyup = null
      }
    }

    function handleAlign(l, isVertical) {
      let offset
      if (isVertical) {
        offset = getComputedStyle(document.getElementById(l[0]), null)['left']
      } else {
        offset = getComputedStyle(document.getElementById(l[0]), null)['top']
      }
      for (let i = 1; i < l.length; i++) {d
        if (isVertical) {
          document.getElementById(l[i]).style.left = offset
        } else {
          document.getElementById(l[i]).style.top = offset
        }
      }
    }

    // handle spacing
    document.onclick = () => {
      if (!selectable) return null
      const target = window.event.target
      if (target.id.indexOf('component') < 0 | selectedEle.indexOf(target.id) >= 0) return null
      selectedEle.push(target)
      this.items[parseInt(target.id.substring(9))].isSelected = true
    }
  },

  methods: {
    onPage() {
      if (this.form.pageSize) {
        const dimension = this.form.pageSize.trim().split(' ')
        this.pageStyle.width = parseInt(dimension[0]) + 'px'
        this.pageStyle.height = parseInt(dimension[1]) + 'px'
      }
      if (this.form.pagePadding) {
        this.pageStyle.padding = parseInt(this.form.pagePadding) + 'px'
      }
    },

    onCreateText(name) {
      if (!this.form.textID) {
        this.alertStyle.display = 'block'
        return false
      }

      const textList = this.form.textID.trim().split(/[ ]+/)
      for (const id of textList) {
        const filterRule = /^[a-zA-Z]+\w*$/g
        if (!filterRule.test(id)) {
          this.alertStyle.display = 'block'
          return false
        }

        let item
        for (item of this.items) {
          if (id === item.dataID) {
            this.alertStyle.display = 'block'
            return false
          }
        }

        this.alertStyle.display = 'none'
        scriptContent.push(id + ':\'\'')
        this.items.push({
          component: name,
          index: textCounter,
          dataID: id,
          isSelected: false,
          styleObject: {
            width: parseInt(this.form.textWidth) + 'px',
            height: parseInt(this.form.textHeight) + 'px',
            'font-size': parseInt(this.form.textSize) + 'pt'
          }
        })
        textCounter++
      }
    },

    onCreateLine(name) {
      const height = parseInt(this.form.lineLength) + 'px'
      // eslint-disable-next-line
      let styleObject = {}
      if (this.form.lineIsVertical) {
        styleObject['height'] = height
        styleObject['border-left'] = this.form.lineBorder
      } else {
        styleObject['width'] = height
        styleObject['border-top'] = this.form.lineBorder
      }
      this.items.push({
        component: name,
        index: textCounter,
        styleObject
      })
      textCounter++
    },

    onUpLoadImg() {
      if (!this.form.inputImg) return false
      const name = this.form.inputImg.split('\\')[2]
      this.imgSrc = require('@/assets/print_images/' + name)
      this.imgStyle.opacity = parseFloat(this.form.imgOpacity)
      this.form.imgButton = false
    },

    onImgHide() {
      this.imgStyle.display = this.form.imgHide ? 'none' : 'inline'
    },

    onImgBack() {
      this.imgStyle['z-index'] = this.form.imgBack ? '-1' : '1'
    },

    onImgOrig() {
      const img = document.getElementById('imgBlock')
      img.style.left = '0px'
      img.style.top = '0px'
    },

    onImgSize() {
      const img = document.getElementById('imgBlock')
      this.pageStyle.width = getComputedStyle(img, null)['width']
      this.pageStyle.height = getComputedStyle(img, null)['height']
    },

    onGridHide() {
      const c = document.getElementById('drawingBoard')
      if (this.form.gridHide) {
        c.style.display = 'none'
      } else {
        c.style.display = 'block'
      }
    },

    onGridGenerate() {
      const c = document.getElementById('drawingBoard')
      const cxt = c.getContext('2d')
      // eslint-disable-next-line
      cxt.canvas.height = cxt.canvas.height
      cxt.strokeStyle = 'black'

      if (!this.form.gridSpacing) return null

      const step = this.form.gridSpacing.split(/[ ]+/)
      step[0] = parseInt(step[0])
      step[1] = parseInt(step[1])
      if (step[0] === 0 | step[1] === 0) return null

      for (let i = 0; i < 3; i++) {
        gridGenerate(cxt, step[0] * Math.pow(2, i), step[1] * Math.pow(2, i), 0.5)
      }
    },

    onEleSelect() {
      if (!selectable) {
        this.form.selectType = 'warning'
        this.form.selectMsg = '取消'
        selectable = true
      } else {
        this.form.selectType = 'primary'
        this.form.selectMsg = '选择'
        selectable = false
        if (selectedEle.length !== 0) this.form.selAppDisable = false
      }
      this.form.selNotClearable = selectable
    },

    onSelClear() {
      let element
      for (element of selectedEle) {
        this.items[parseInt(element.id.substring(9))].isSelected = false
      }
      selectedEle = []
      this.form.selAppDisable = true
    },

    onSpacing() {
      if (selectedEle.length < 3) {
        alert('请选择至少三个元素')
        return null
      }

      const direction = this.form.spacingIsVertical ? 'top' : 'left'
      const divMeasure = this.form.spacingIsVertical ? 'height' : 'width'
      selectedEle.sort(function(a, b) {
        return parseInt(getComputedStyle(a, null)[direction]) -
               parseInt(getComputedStyle(b, null)[direction])
      })

      let offset
      if (this.form.spacingDistance) {
        offset = parseInt(this.form.spacingDistance)
      } else {
        offset = parseInt(getComputedStyle(selectedEle[selectedEle.length - 1], null)[direction]) -
                 parseInt(getComputedStyle(selectedEle[0], null)[direction])
        for (let i = 0; i < selectedEle.length - 1; i++) {
          offset -= parseInt(getComputedStyle(selectedEle[i], null)[divMeasure])
        }
        offset /= (selectedEle.length - 1)
      }

      for (let i = 1; i < selectedEle.length; i++) {
        const distance = parseInt(getComputedStyle(selectedEle[i - 1], null)[direction]) +
                         parseInt(getComputedStyle(selectedEle[i - 1], null)[divMeasure]) +
                         offset
        if (this.form.spacingIsVertical) {
          selectedEle[i].style.top = distance + 'px'
        } else {
          selectedEle[i].style.left = distance + 'px'
        }
      }
    },

    onDeleteLast() {
      const item = this.items.pop()
      if (item) {
        textCounter--
        if (item.component === 'textChild') {
          scriptContent.pop()
        }
      }
    },

    onExport() {
      const contentStr = document.getElementById('canvas').outerHTML
      const newpage = this.$router.resolve({
        name: 'Result',
        params: {
          content: encodeURI(contentStr),
          vueScript: encodeURI(scriptContent.join(','))
        }
      })
      window.open(newpage.href, '_blank')
    },

    handleDrag(e, disableCheck) {
      if (e.button !== 0) return false
      e.preventDefault()
      const targetObj = e.target
      const parentObj = targetObj.parentNode
      const relative_x = e.clientX - parseInt(getComputedStyle(targetObj, null)['left'])
      const relative_y = e.clientY - parseInt(getComputedStyle(targetObj, null)['top'])
      const paddingSize = parseInt(this.pageStyle.padding)
      document.onmousemove = (e) => {
        const new_x = e.clientX - relative_x
        const new_y = e.clientY - relative_y

        if (disableCheck) {
          targetObj.style.left = new_x + 'px'
          targetObj.style.top = new_y + 'px'
        } else {
          targetObj.style.left = checkBorder(new_x, targetObj, parentObj, paddingSize, 0) + 'px'
          targetObj.style.top = checkBorder(new_y, targetObj, parentObj, paddingSize, 1) + 'px'
        }
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },

    handleResize(e, disableCheck, hasPermission) {
      if (!hasPermission) return false
      const targetObj = e.target
      const parentObj = targetObj.parentNode
      const x = e.clientX
      const y = e.clientY
      const h = parseInt(getComputedStyle(targetObj, null)['height'])
      const w = parseInt(getComputedStyle(targetObj, null)['width'])
      const paddingSize = parseInt(this.pageStyle.padding)
      document.onmousemove = (e) => {
        let n_h = e.clientY - y + h
        let n_w = e.clientX - x + w
        n_h = n_h < 5 ? 5 : n_h
        n_w = n_w < 5 ? 5 : n_w

        if (disableCheck) {
          targetObj.style.height = n_h + 'px'
          targetObj.style.width = n_w + 'px'
          if (targetObj.id === 'canvas') {
            const drawingBoard = document.getElementById('drawingBoard')
            drawingBoard.height = n_h
            drawingBoard.width = n_w
            drawingBoard.style.height = n_h + 'px'
            drawingBoard.style.width = n_w + 'px'
          }
        } else {
          const targetTop = parseInt(getComputedStyle(targetObj, null)['top'])
          const targetLeft = parseInt(getComputedStyle(targetObj, null)['left'])
          targetObj.style.height = checkResize(n_h, targetTop, parentObj, paddingSize, 1) + 'px'
          targetObj.style.width = checkResize(n_w, targetLeft, parentObj, paddingSize, 0) + 'px'
        }
      }
      document.onmouseup = (e) => {
        this.$refs.gridClick.handleClick()
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}

// return original position if target is in parent area and doesn't overlap padding area
// return border position othervise
// whichSide = 0 check left and right border
// whichSide = 1 check top and right bottom
function checkBorder(p, targetObj, parentObj, paddingSize, whichSide) {
  if (!whichSide) {
    const parentWidth = parseInt(getComputedStyle(parentObj, null)['width'])
    const targetWidth = parseInt(getComputedStyle(targetObj, null)['width'])
    const targetX = parseInt(getComputedStyle(targetObj, null)['left'])
    const distantToLeft = targetX + parentObj.offsetLeft - targetObj.offsetLeft + paddingSize
    const distantToRight = parentObj.offsetLeft + parentWidth -
          (targetObj.offsetLeft - targetX + targetWidth) - paddingSize
    return p < distantToLeft ? distantToLeft : p > distantToRight ? distantToRight : p
  }
  const parentHeight = parseInt(getComputedStyle(parentObj, null)['height'])
  const targetHeight = parseInt(getComputedStyle(targetObj, null)['height'])
  const targetY = parseInt(getComputedStyle(targetObj, null)['top'])
  const distantToTop = targetY + parentObj.offsetTop - targetObj.offsetTop + paddingSize
  const distantToBottom = parentObj.offsetTop + parentHeight -
        (targetObj.offsetTop - targetY + targetHeight) - paddingSize
  return p < distantToTop ? distantToTop : p > distantToBottom ? distantToBottom : p
}

function checkResize(length, targetLoc, parentObj, paddingSize, whichSide) {
  let parentLength
  if (!whichSide) {
    parentLength = parseInt(getComputedStyle(parentObj, null)['width'])
  } else {
    parentLength = parseInt(getComputedStyle(parentObj, null)['height'])
  }
  const maxLength = parentLength - paddingSize - targetLoc
  return length < maxLength ? length : maxLength
}

function gridGenerate(cxt, stepx, stepy, lineWidth) {
  cxt.lineWidth = lineWidth
  for (let i = 0; i <= cxt.canvas.height; i += stepy) {
    cxt.beginPath()
    cxt.moveTo(0, i)
    cxt.lineTo(cxt.canvas.width - 1, i)
    cxt.stroke()
  }

  for (let i = 0; i <= cxt.canvas.width; i += stepx) {
    cxt.beginPath()
    cxt.moveTo(i, 0)
    cxt.lineTo(i, cxt.canvas.height - 1)
    cxt.stroke()
  }
}
</script>

<style scoped>
.menu-interface {
  float: left;
  width: 30%;
  min-width: 380px;
}

.graphic-interface{
  border: 1pt dotted #000000;
  float: left;
  position: relative;
  margin: 2%;
  margin-left: 3%;
}

.selected{
  border-color: red;
}

#drawingBoard{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.canvas{
  position: relative;
}
</style>
