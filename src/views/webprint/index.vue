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
              <el-input v-model="form.pageSize" placeholder="大小(宽 高)" clearable @keyup.native="testInput($event, false, true)" />
            </el-col>
            <el-col :span="10">
              <el-input v-model="form.pagePadding" placeholder="边距" clearable @keyup.native="testInput($event, false, false)" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onPage">确认</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="20">
                <span>页面缩放 </span><el-switch v-model="form.pageResize" />
              </el-col>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="文字框">
          <el-row>
            <el-col :span="20">
              <el-input v-model="form.textID" placeholder="ID 使用空格隔开创建多个文字框" clearable />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onCreateText('textChild')">确认</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-input v-model="form.textSize" placeholder="字体大小" clearable @input="handleApplyStyle()" @keyup.native="testInput($event, false, false)" />
            </el-col>
            <el-col :span="24">
              <el-checkbox-group v-model="form.textStyle" @change="handleApplyStyle()">
                <el-checkbox label="加粗" />
                <el-checkbox label="斜体" />
                <el-checkbox label="下划线" />
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="线条">
          <el-row>
            <el-col :span="20">
              <el-input v-model="form.lineBorderWidth" placeholder="宽度" clearable @input="handleApplyStyle()" @keyup.native="testInput($event, false, false)" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onCreateLine('lineChild')">确认</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-switch v-model="form.lineIsVertical" active-text="竖" inactive-text="横" />
            </el-col>
            <el-col :span="10">
              <el-switch v-model="form.lineIsDotted" active-text="虚线" inactive-text="实线" @change="handleApplyStyle()" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="图片选项">
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.inputImg" type="file" />
            </el-col>
            <el-col :span="6">
              <el-input v-model="form.imgOpacity" type="primary" placeholder="清晰度" @keyup.native="testInput($event, true, false)" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onUpLoadImg()">载入</el-button>
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
            <el-col :sm="24">
              <el-button-group>
                <el-button type="primary" :disabled="form.imgButton" @click="onImgSize()">页面图片大小一致</el-button>
                <el-button type="primary" :disabled="form.imgButton" @click="onImgOrig()">返回初始位置</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="网格">
          <el-col :span="10">
            <el-input v-model="form.gridSpacing" type="primary" placeholder="网格间距" clearable @keyup.native="testInput($event, false, true)" />
          </el-col>
          <el-col :span="10">
            <span>&emsp;隐藏 </span><el-switch v-model="form.gridHide" @change="onGridHide()" />
          </el-col>
          <el-col :span="4">
            <el-button ref="gridClick" type="primary" @click="onGridGenerate()">确认</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="元素对齐">
          <el-col :span="20">
            <el-switch v-model="form.alignIsVertical" active-text="垂直" inactive-text="水平" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleAlign()">确认</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="元素等距">
          <el-row>
            <el-col :span="8">
              <el-input v-model="form.spacingDistance" type="primary" placeholder="间距" clearable @keyup.native="testInput($event, false, false)" />
            </el-col>
            <el-col :span="12">
              <span>&emsp;</span><el-switch v-model="form.spacingIsVertical" active-text="垂直" inactive-text="水平" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onSpacing()">确认</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="删除">
          <el-button-group>
            <el-button type="primary" @click="onDeleteLast()">删除上一个</el-button>
            <el-button type="primary" @click="onDeleteSel()">删除选中</el-button>
          </el-button-group>
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

const PAGE_WIDTH = '400px'
const PAGE_HEIGHT = '300px'
const TEXT_WIDTH = '50px'
const TEXT_HEIGHT = '50px'
const MIN_SIZE = '10px'
const FONT_SIZE = '12pt'
const LINE_WIDTH = '3px'
const LINE_LENGTH = '100px'
const IMG_OPACITY = 0.5
const GRID_SPACING = 20
const GRID_LINE_WIDTH = 0.3
const GRID_CENTER_OFFSET = -0.5 // remove line aliasing, can be 0.5
const SELECT_KEY = 65 // press A to select

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
        height: PAGE_HEIGHT,
        width: PAGE_WIDTH,
        padding: '0px',
        'box-sizing': 'border-box'
      },
      imgStyle: {
        position: 'absolute',
        opacity: IMG_OPACITY,
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
        textSize: '',
        textID: '',
        textStyle: [],
        lineBorderWidth: '',
        lineIsVertical: false,
        lineIsDotted: false,
        inputImg: '',
        imgHide: false,
        imgOpacity: '',
        imgBack: false,
        imgButton: true,
        alignIsVertical: false,
        spacingIsVertical: false,
        spacingDistance: '',
        gridSpacing: '',
        gridHide: false
      },
      items: [],
      imgSrc: ''
    }
  },

  created() {
    document.onkeydown = (e) => {
      if (selectable) return null
      if (e.keyCode !== SELECT_KEY) return null // if not A
      selectable = true

      document.onclick = (e) => {
        const target = e.target
        if (target.id.indexOf('component') < 0) return null
        const index = selectedEle.indexOf(target)
        if (index >= 0) {
          selectedEle.splice(index, 1)
          this.items[target.id.substring(9)].isSelected = false
        } else {
          selectedEle.push(target)
          this.items[target.id.substring(9)].isSelected = true
        }
      }

      document.onmousedown = (e) => {
        if (e.button !== 2) return null
        for (const element of selectedEle) {
          this.items[parseInt(element.id.substring(9))].isSelected = false
        }
        selectedEle = []
      }

      document.onkeyup = () => {
        selectable = false
        document.onmousedown = null
        document.onclick = null
        document.onkeyup = null
      }
    }
  },

  methods: {
    onPage() {
      if (this.form.pageSize) {
        const dimension = this.form.pageSize.trim().split(/[ ]+/)
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

        const styleObject = {
          width: TEXT_WIDTH,
          height: TEXT_HEIGHT,
          'font-size': this.form.textSize ? this.form.textSize + 'pt' : FONT_SIZE,
          'font-style': 'normal',
          'font-weight': 'normal',
          'text-decoration': 'none'
        }
        if (this.form.textStyle.indexOf('加粗') >= 0) {
          styleObject['font-weight'] = 'bold'
        }
        if (this.form.textStyle.indexOf('斜体') >= 0) {
          styleObject['font-style'] = 'italic'
        }
        if (this.form.textStyle.indexOf('下划线') >= 0) {
          styleObject['text-decoration'] = 'underline'
        }

        scriptContent.push(id + ':\'\'')
        this.items.push({
          component: name,
          index: textCounter,
          dataID: id,
          isSelected: false,
          styleObject
        })
        textCounter++
      }
    },

    onCreateLine(name) {
      const length = LINE_LENGTH
      let border = this.form.lineBorderWidth ? this.form.lineBorderWidth + 'px ' : LINE_WIDTH + ' '
      border += this.form.lineIsDotted ? 'dashed ' : 'solid '
      border += 'black'
      const styleObject = {}
      if (this.form.lineIsVertical) {
        styleObject['height'] = length
        styleObject['border-left'] = border
      } else {
        styleObject['width'] = length
        styleObject['border-top'] = border
      }
      this.items.push({
        component: name,
        index: textCounter,
        styleObject,
        isSelected: false,
        lineIsVertical: this.form.lineIsVertical
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

      let step = []
      if (!this.form.gridSpacing) {
        step[0] = GRID_SPACING
        step[1] = GRID_SPACING
      } else {
        step = this.form.gridSpacing.split(/[ ]+/)
        step[0] = parseInt(step[0])
        step[1] = parseInt(step[1])
      }
      if (step[0] === 0 | step[1] === 0) return null

      for (let i = 0; i < 3; i++) {
        gridGenerate(cxt, step[0] * Math.pow(2, i), step[1] * Math.pow(2, i), GRID_LINE_WIDTH)
      }
    },

    handleAlign() {
      if (selectedEle.length < 2) {
        alert('请选择至少2个元素')
        return null
      }
      let offset
      if (this.form.alignIsVertical) {
        offset = getComputedStyle(selectedEle[selectedEle.length - 1], null)['left']
      } else {
        offset = getComputedStyle(selectedEle[selectedEle.length - 1], null)['top']
      }
      for (let i = 0; i < selectedEle.length - 1; i++) {
        if (this.form.alignIsVertical) {
          selectedEle[i].style.left = offset
        } else {
          selectedEle[i].style.top = offset
        }
      }
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
        n_h = n_h < MIN_SIZE ? MIN_SIZE : n_h
        n_w = n_w < MIN_SIZE ? MIN_SIZE : n_w

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
          const item = this.items[targetObj.id.substring(9)]
          if (item.component !== 'lineChild' | !item.lineIsVertical) {
            targetObj.style.width = checkResize(n_w, targetLeft, parentObj, paddingSize, 0) + 'px'
          }
          if (item.component !== 'lineChild' | item.lineIsVertical) {
            targetObj.style.height = checkResize(n_h, targetTop, parentObj, paddingSize, 1) + 'px'
          }
        }
      }
      document.onmouseup = (e) => {
        this.$refs.gridClick.handleClick()
        document.onmousemove = null
        document.onmouseup = null
      }
    },

    handleApplyStyle() {
      const textSize = parseInt(this.form.textSize)
      for (let i = 0; i < selectedEle.length; i++) {
        const item = this.items[parseInt(selectedEle[i].id.substring(9))]
        if (item.component === 'textChild') {
          // TODO simplify
          if (this.form.textStyle.indexOf('加粗') >= 0) {
            item.styleObject['font-weight'] = 'bold'
          } else {
            item.styleObject['font-weight'] = 'normal'
          }
          if (this.form.textStyle.indexOf('斜体') >= 0) {
            item.styleObject['font-style'] = 'italic'
          } else {
            item.styleObject['font-style'] = 'normal'
          }
          if (this.form.textStyle.indexOf('下划线') >= 0) {
            item.styleObject['text-decoration'] = 'underline'
          } else {
            item.styleObject['text-decoration'] = 'none'
          }
          if (textSize) {
            item.styleObject['font-size'] = textSize + 'pt'
          } else {
            item.styleObject['font-size'] = FONT_SIZE
          }
        } else {
          const dir = item.styleObject['border-left'] ? 'border-left' : 'border-top'
          let borderStyle = item.styleObject[dir].split(' ')
          borderStyle[0] = this.form.lineBorderWidth ? this.form.lineBorderWidth + 'px' : LINE_WIDTH
          borderStyle[1] = this.form.lineIsDotted ? 'dashed' : 'solid'
          borderStyle = borderStyle.join(' ')
          item.styleObject[dir] = borderStyle
        }
      }
    },

    // TODO
    testInput(e, isDouble, allowMultiple) {
      const value = e.target.value
      const hasNonNumber = /[^0-9 .]/g
      if (hasNonNumber.test(value)) {
        e.target.value = value.substring(0, value.length - 1)
        return null
      }
      if (!isDouble) {
        const hasDot = /[.]/g
        if (hasDot.test(value)) {
          e.target.value = value.substring(0, value.length - 1)
          return null
        }
      }
      if (!allowMultiple) {
        const hasSpace = /[ ]/g
        if (hasSpace.test(value)) {
          e.target.value = value.substring(0, value.length - 1)
          return null
        }
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
    cxt.moveTo(GRID_CENTER_OFFSET, i + GRID_CENTER_OFFSET)
    cxt.lineTo(cxt.canvas.width - 1 + GRID_CENTER_OFFSET, i + GRID_CENTER_OFFSET)
    cxt.stroke()
  }

  for (let i = 0; i <= cxt.canvas.width; i += stepx) {
    cxt.beginPath()
    cxt.moveTo(i + GRID_CENTER_OFFSET, GRID_CENTER_OFFSET)
    cxt.lineTo(i + GRID_CENTER_OFFSET, cxt.canvas.height - 1 + GRID_CENTER_OFFSET)
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
  border-color: red !important;
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
