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
              <el-input
                v-model="form.pageSize"
                placeholder="大小(宽 高)"
                clearable
                @keyup.native="testInput($event, false, true)"
                @keyup.enter.native="onPage()"
              />
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="form.pagePadding"
                placeholder="边距"
                clearable
                @keyup.native="testInput($event, false, false)"
                @keyup.enter.native="onPage()"
              />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onPage()">确认</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-col :span="20">
                <el-switch v-model="form.pageResize" active-text="拖拽" inactive-text="固定" />
              </el-col>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="图片">
          <el-row>
            <el-col :span="20">
              <el-input v-model="form.inputImg" type="file" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onUpLoadImg()">载入</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-input
                v-model="form.imgOpacity"
                type="primary"
                placeholder="透明度"
                @keyup.native="testInput($event, true, false)"
                @keyup.enter.native="onUpLoadImg()"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-switch v-model="form.imgHide" active-text="隐藏" inactive-text="显示" @change="onImgHide" />
            </el-col>
            <el-col :span="12">
              <span>&emsp;</span>
              <el-switch v-model="form.imgBack" active-text="背景" inactive-text="前景" @change="onImgBack" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24">
              <el-button-group>
                <el-button type="primary" :disabled="form.imgButton" @click="onImgSize()">页面与图片大小一致</el-button>
                <el-button type="primary" :disabled="form.imgButton" @click="onImgOrig()">返回初始位置</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="文字框">
          <el-row>
            <el-col :span="20">
              <el-input
                v-model="form.textID"
                placeholder="ID 使用空格隔开创建多个文字框"
                clearable
                @keyup.enter.native="onCreateText('textChild')"
              />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onCreateText('textChild')">确认</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-input
                v-model="form.textSize"
                placeholder="字体大小"
                clearable
                @input="handleApplyStyle()"
                @keyup.native="testInput($event, false, false)"
              />
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
              <el-input
                v-model="form.lineBorderWidth"
                placeholder="宽度"
                clearable
                @input="handleApplyStyle()"
                @keyup.native="testInput($event, false, false)"
                @keyup.enter.native="onCreateLine('lineChild')"
              />
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
        <el-form-item label="对齐">
          <el-col :span="20">
            <el-switch v-model="form.alignIsVertical" active-text="垂直" inactive-text="水平" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleAlign()">确认</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="等距">
          <el-row>
            <el-col :span="8">
              <el-input
                v-model="form.spacingDistance"
                type="primary"
                placeholder="间距"
                clearable
                @keyup.native="testInput($event, false, false)"
                @keyup.enter.native="onSpacing()"
              />
            </el-col>
            <el-col :span="12">
              <span>&emsp;</span>
              <el-switch v-model="form.spacingIsVertical" active-text="垂直" inactive-text="水平" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onSpacing()">确认</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="网格">
          <el-col :span="8">
            <el-input
              v-model="form.gridSpacing"
              type="primary"
              placeholder="宽 高"
              clearable
              @keyup.native="testInput($event, false, true)"
              @keyup.enter.native="onGridGenerate()"
            />
          </el-col>
          <el-col :span="12">
            <span>&emsp;</span>
            <el-switch v-model="form.gridHide" active-text="隐藏" inactive-text="显示" @change="onGridHide()" />
          </el-col>
          <el-col :span="4">
            <el-button ref="gridClick" type="primary" @click="onGridGenerate()">确认</el-button>
          </el-col>
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

// 默认设置
const PAGE_WIDTH = '400px'
const PAGE_HEIGHT = '300px'
const PAGE_PADDING = '10px'
const TEXT_WIDTH = '50px'
const TEXT_HEIGHT = '50px'
const MIN_SIZE = '10px'
const FONT_SIZE = '12pt'
const LINE_WIDTH = '3px'
const LINE_LENGTH = '100px'
const IMG_OPACITY = 0.5
const GRID_SPACING = 20
const GRID_LINE_WIDTH = 0.3
const GRID_CENTER_OFFSET = -0.5 // 防止线条锯齿，可用0.5
const SELECT_KEY = 65 // 点击A来选择

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
        padding: PAGE_PADDING,
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
        gridHide: true
      },
      items: [],
      imgSrc: ''
    }
  },

  created() {
    // 长按键盘 + 鼠标点击选择元素，再次点击取消选择，长按键盘 + 鼠标右键清空选择
    document.onkeydown = (e) => {
      if (selectable) return null
      if (e.keyCode !== SELECT_KEY) return null
      selectable = true
      // 鼠标点击事件 选择或取消选择
      document.onclick = (e) => {
        // 判断目标是否为文本或线条
        const target = e.target
        if (target.id.indexOf('component') < 0) return null
        // 判断是否已经选择并添加或删除class改变样式
        const index = selectedEle.indexOf(target)
        if (index >= 0) {
          selectedEle.splice(index, 1)
          this.items[target.id.substring(9)].isSelected = false
        } else {
          selectedEle.push(target)
          this.items[target.id.substring(9)].isSelected = true
        }
      }

      // 鼠标右键事件 清空选择并还原样式
      document.onmousedown = (e) => {
        // 判断是否为鼠标右键
        if (e.button !== 2) return null
        for (const element of selectedEle) {
          this.items[parseInt(element.id.substring(9))].isSelected = false
        }
        selectedEle = []
      }

      // 松开事件 清空全部新建事件
      document.onkeyup = () => {
        selectable = false
        document.onmousedown = null
        document.onclick = null
        document.onkeyup = null
      }
    }
  },

  methods: {
    // 改变画布大小和边距 需要vue
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

    // 创建新的文本框，id禁止有特殊字符除下划线_ 禁止使用非字母开头
    // 可使用空格将多个ID分开并一起创建
    // 需要vue的支持
    onCreateText(name) {
      // 判断ID是否为空 并报错
      if (!this.form.textID) {
        this.alertStyle.display = 'block'
        return false
      }

      const textList = this.form.textID.trim().split(/[ ]+/)
      for (const id of textList) {
        // 判断ID是否符合规则
        const filterRule = /^[a-zA-Z]+\w*$/g
        if (!filterRule.test(id)) {
          this.alertStyle.display = 'block'
          return false
        }

        // 判断ID是否重复
        let item
        for (item of this.items) {
          if (id === item.dataID) {
            this.alertStyle.display = 'block'
            return false
          }
        }
        this.alertStyle.display = 'none'

        // 使用v-bind 将styleObject与元素关联
        const styleObject = {
          width: TEXT_WIDTH,
          height: TEXT_HEIGHT,
          'font-size': this.form.textSize ? parseInt(this.form.textSize) + 'pt' : FONT_SIZE,
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

        // 将元素设置加入到元素列表中后，vue会负责渲染
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

    // 创建线条 无法一次创建多个线条 需要vue
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
      // 将元素设置加入到元素列表中后，vue会负责渲染
      this.items.push({
        component: name,
        index: textCounter,
        styleObject,
        isSelected: false,
        lineIsVertical: this.form.lineIsVertical
      })
      textCounter++
    },

    // 加载图片 所有图片都在src/assests/print_images/当中
    onUpLoadImg() {
      if (!this.form.inputImg) return false
      const name = this.form.inputImg.split('\\')[2]
      this.imgSrc = require('@/assets/print_images/' + name)
      this.imgStyle.opacity = parseFloat(this.form.imgOpacity)
      this.form.imgButton = false
    },

    // 设置是否隐藏图片
    onImgHide() {
      this.imgStyle.display = this.form.imgHide ? 'none' : 'inline'
    },

    // 设置是否移动图片到背景
    onImgBack() {
      this.imgStyle['z-index'] = this.form.imgBack ? '-1' : '1'
    },

    // 将图片移动到初始位置
    onImgOrig() {
      const img = document.getElementById('imgBlock')
      img.style.left = '0px'
      img.style.top = '0px'
    },

    // 是画布大小与图片大小一致
    onImgSize() {
      const img = document.getElementById('imgBlock')
      this.pageStyle.width = getComputedStyle(img, null)['width']
      this.pageStyle.height = getComputedStyle(img, null)['height']
    },

    // 隐藏或显示网格
    onGridHide() {
      const c = document.getElementById('drawingBoard')
      if (this.form.gridHide) {
        c.style.display = 'none'
      } else {
        c.style.display = 'block'
      }
    },

    // 使用html5 canvas 生成网格
    onGridGenerate() {
      const c = document.getElementById('drawingBoard')
      c.style.display = this.form.gridHide ? 'none' : 'block'
      const cxt = c.getContext('2d')
      // 清空canvas的内容
      // eslint-disable-next-line
      cxt.canvas.height = cxt.canvas.height
      cxt.strokeStyle = 'black'
      // 设置x和y轴的间距
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
      // 生成网格
      for (let i = 0; i < 3; i++) {
        gridGenerate(cxt, step[0] * Math.pow(2, i), step[1] * Math.pow(2, i), GRID_LINE_WIDTH)
      }
    },

    // 选中元素对齐 以最后选择到到元素为基准对齐
    handleAlign() {
      // 必须选择两个或两个以上的元素
      if (selectedEle.length < 2) {
        alert('请选择至少2个元素')
        return null
      }
      // 找到基准的位置
      let offset
      if (this.form.alignIsVertical) {
        offset = getComputedStyle(selectedEle[selectedEle.length - 1], null)['left']
      } else {
        offset = getComputedStyle(selectedEle[selectedEle.length - 1], null)['top']
      }
      // 改变剩余元素的位置
      for (let i = 0; i < selectedEle.length - 1; i++) {
        if (this.form.alignIsVertical) {
          selectedEle[i].style.left = offset
        } else {
          selectedEle[i].style.top = offset
        }
      }
    },

    // 设置选中元素的间距 选中的元素至少为3个
    // 如果用户没有输入任何间距，则以最两端元素为基准，改变其它元素的位置
    // 如果用户规定来间距，则以最左或最上的元素为基准，改变其它元素的位置
    onSpacing() {
      if (selectedEle.length < 3) {
        alert('请选择至少三个元素')
        return null
      }

      // 判断间距方向
      const direction = this.form.spacingIsVertical ? 'top' : 'left'
      const divMeasure = this.form.spacingIsVertical ? 'height' : 'width'
      // 对所有选中的元素进行升序排序，左或上为最小值
      selectedEle.sort(function(a, b) {
        return parseInt(getComputedStyle(a, null)[direction]) -
               parseInt(getComputedStyle(b, null)[direction])
      })

      // 设置元素的间距
      let offset
      if (this.form.spacingDistance) {
        offset = parseInt(this.form.spacingDistance)
      } else {
        // 计算元素的间距 如果用户没有规定间距
        offset = parseInt(getComputedStyle(selectedEle[selectedEle.length - 1], null)[direction]) -
                 parseInt(getComputedStyle(selectedEle[0], null)[direction])
        for (let i = 0; i < selectedEle.length - 1; i++) {
          offset -= parseInt(getComputedStyle(selectedEle[i], null)[divMeasure])
        }
        offset /= (selectedEle.length - 1)
      }

      // 对剩余所有的元素设置位置 保证间距统一
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

    // 删除上一个元素 从列表中删除
    onDeleteLast() {
      const item = this.items.pop()
      if (item) {
        textCounter--
      }
    },

    // 删除选中的元素
    // 并没有从列表中删除，html中没有这些元素
    onDeleteSel() {
      let index
      for (let i = 0; i < selectedEle.length; i++) {
        index = selectedEle[i].id.substring(9)
        this.items[index].component = null
        this.items[index].index = null
        this.items[index].dataID = null
        this.items[index].isSelected = null
        this.items[index].styleObject = null
      }
      selectedEle = []
    },

    // 导出
    onExport() {
      const contentStr = document.getElementById('canvas').outerHTML

      // 设置vue的脚本
      const scriptContent = []
      for (const item of this.items) {
        if (item.component === 'textChild') {
          scriptContent.push(item.dataID + ':\'\'')
        }
      }

      // 创建新的路由并在新窗口中打开
      const newpage = this.$router.resolve({
        name: 'Result',
        params: {
          content: encodeURI(contentStr),
          vueScript: encodeURI(scriptContent.join(','))
        }
      })
      window.open(newpage.href, '_blank')
    },

    // 使用鼠标左键进行元素拖拽
    handleDrag(e, disableCheck) {
      if (e.button !== 0) return false
      // 防止右键弹窗
      e.preventDefault()
      const targetObj = e.target
      const parentObj = targetObj.parentNode

      // 计算出鼠标与元素之间的相对位置
      const relative_x = e.clientX - parseInt(getComputedStyle(targetObj, null)['left'])
      const relative_y = e.clientY - parseInt(getComputedStyle(targetObj, null)['top'])
      const paddingSize = parseInt(this.pageStyle.padding)
      document.onmousemove = (e) => {
        // 根据鼠标新位置与相对位置计算出新的元素位置
        const new_x = e.clientX - relative_x
        const new_y = e.clientY - relative_y

        // 是否进行边框检查 防止元素拖出画布
        if (disableCheck) {
          targetObj.style.left = new_x + 'px'
          targetObj.style.top = new_y + 'px'
        } else {
          targetObj.style.left = checkBorder(new_x, targetObj, parentObj, paddingSize, 0) + 'px'
          targetObj.style.top = checkBorder(new_y, targetObj, parentObj, paddingSize, 1) + 'px'
        }
      }
      document.onmouseup = (e) => {
        // 清空所有新建事件
        document.onmousemove = null
        document.onmouseup = null
      }
    },

    // 使用鼠标右键改变元素大小
    handleResize(e, disableCheck, hasPermission) {
      if (!hasPermission) return false
      const targetObj = e.target
      const parentObj = targetObj.parentNode
      // 记录初始鼠标位置
      const x = e.clientX
      const y = e.clientY
      const h = parseInt(getComputedStyle(targetObj, null)['height'])
      const w = parseInt(getComputedStyle(targetObj, null)['width'])
      const paddingSize = parseInt(this.pageStyle.padding)
      document.onmousemove = (e) => {
        // 计算新的元素大小
        let n_h = e.clientY - y + h
        let n_w = e.clientX - x + w
        // 设置元素最小长宽
        n_h = n_h < MIN_SIZE ? MIN_SIZE : n_h
        n_w = n_w < MIN_SIZE ? MIN_SIZE : n_w

        // 是否阻止元素拖出画布
        if (disableCheck) {
          // 不阻止
          targetObj.style.height = n_h + 'px'
          targetObj.style.width = n_w + 'px'
          if (targetObj.id === 'canvas') {
            // 重新设置canvas大小
            // drawingBoard长宽必须与drawingBoard.style长宽一致
            // 否则画面将被变形
            const drawingBoard = document.getElementById('drawingBoard')
            drawingBoard.height = n_h
            drawingBoard.width = n_w
            drawingBoard.style.height = n_h + 'px'
            drawingBoard.style.width = n_w + 'px'
          }
        } else {
          // 判断新的大小是否超出画布
          const targetTop = parseInt(getComputedStyle(targetObj, null)['top'])
          const targetLeft = parseInt(getComputedStyle(targetObj, null)['left'])
          const item = this.items[targetObj.id.substring(9)]
          // 横线只能改变宽度
          if (item.component !== 'lineChild' | !item.lineIsVertical) {
            targetObj.style.width = checkResize(n_w, targetLeft, parentObj, paddingSize, 0) + 'px'
          }
          // 垂线只能改变高度
          if (item.component !== 'lineChild' | item.lineIsVertical) {
            targetObj.style.height = checkResize(n_h, targetTop, parentObj, paddingSize, 1) + 'px'
          }
        }
      }
      document.onmouseup = (e) => {
        // 鼠标松开时 更新网格
        if (!this.form.gridHide) {
          this.$refs.gridClick.handleClick()
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    },

    // 改变选中的文本框或者线条样式
    // 文本框无法改变ID
    // 线条无法改变横竖
    handleApplyStyle() {
      const textSize = parseInt(this.form.textSize)
      for (let i = 0; i < selectedEle.length; i++) {
        const item = this.items[parseInt(selectedEle[i].id.substring(9))]
        if (item.component === 'textChild') {
          // 如果是文本框 设置以下样式
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
          // 如果是线条 设置以下样式
          const dir = item.styleObject['border-left'] ? 'border-left' : 'border-top'
          let borderStyle = item.styleObject[dir].split(' ')
          borderStyle[0] = this.form.lineBorderWidth ? this.form.lineBorderWidth + 'px' : LINE_WIDTH
          borderStyle[1] = this.form.lineIsDotted ? 'dashed' : 'solid'
          borderStyle = borderStyle.join(' ')
          item.styleObject[dir] = borderStyle
        }
      }
    },

    // 检测用户输入是否正确
    // 如果不正确 则删除最后以为字符
    testInput(e, isDouble, allowMultiple) {
      const value = e.target.value
      // 禁止任何非0-9，空格，小数点之外的输入
      const rule0 = /([^0-9 .]|^[ ]+)/g
      if (rule0.test(value)) {
        e.target.value = value.substring(0, value.length - 1)
        return null
      }
      if (!allowMultiple) {
        // 禁止空格键
        const rule1 = /[ ]/g
        if (rule1.test(value)) {
          e.target.value = value.substring(0, value.length - 1)
          return null
        }
      }
      if (!isDouble) {
        // 禁止小数点，数字开头禁止为0
        const rule2 = /(((^|[ ])(0))|[\.])/g
        if (rule2.test(value)) {
          e.target.value = value.substring(0, value.length - 1)
          return null
        }
      } else {
        // 一个数字禁止有多个小数点
        const rule3 = /(^|[ ])(\d*\.){2,}/g
        // 禁止使用小数点开头
        // 如果数字 > 1， 禁止使用0开头
        const rule4 = /(^|[ ])(\.|0\d)/g
        if (rule3.test(value) | rule4.test(value)) {
          e.target.value = value.substring(0, value.length - 1)
          return null
        }
      }
    }
  }
}

// 检测拖拽元素是否超出父元素的边框
// 返回初始位置如果元素在父元素内并且没有与覆盖padding
// 反之，返回元素正好与padding交汇的位置
// whichSide = 0 检测左右边框
// whichSide = 1 检测上下边框
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

// 检测拉伸元素时，元素是否超出画布
// 返回初始长宽如果元素在父元素内并且没有与覆盖padding
// 反之，返回元素正好与padding交汇的长宽
// whichSide = 0 检测宽度
// whichSide = 1 检测高度
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

// 生成网格
// lineWidth <= 1 时，必须使用GRID_CENTER_OFFSET消除锯齿
function gridGenerate(cxt, stepx, stepy, lineWidth) {
  cxt.lineWidth = lineWidth
  // 横向画线
  for (let i = 0; i <= cxt.canvas.height; i += stepy) {
    cxt.beginPath()
    cxt.moveTo(GRID_CENTER_OFFSET, i + GRID_CENTER_OFFSET)
    cxt.lineTo(cxt.canvas.width - 1 + GRID_CENTER_OFFSET, i + GRID_CENTER_OFFSET)
    cxt.stroke()
  }

  // 纵向画线
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
