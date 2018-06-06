<template>
  <div id="ElLayout1">
    <el-container>
      <el-header style="padding:0px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </el-header>
      <el-container :style="{height: contentHeight + 'px'}">
        <!-- 左侧菜单栏 -->
        <el-menu :collapse="true">
          <el-menu-item index="2" @click="toggleTabs('0')">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
        <grid-layout :layout="layout"
                         :col-num="1280"
                         :row-height="1"
                         :vertical-compact="true"
                         :margin="[0, 0]"
                         :use-css-transforms="true" style="width:100%;height:100%;">
                <!-- 左侧菜单控制内容 -->          
                <grid-item :x="layout[0].x"
                           :y="layout[0].y"
                           :w="layout[0].w"
                           :h="layout[0].h"
                           :is-resizable="true"
                           :is-draggable="false"
                           :i="layout[0].i" @resize="resizeEvent" style="height:100%;" v-show="tabs['0']">
                      <data-source @childEvent = "listenChild"></data-source>
                </grid-item>  
                <!-- 中间内容 -->
                <grid-item :x="layout[1].x"
                           :y="layout[1].y"
                           :w="layout[1].w"
                           :h="layout[1].h"
                           :i="layout[1].i"
                           :is-resizable="true"
                           :is-draggable="false" @resize="resizeEvent" style="height:100%;">
                    <table-info></table-info>       
                </grid-item>
                <!-- 右侧菜单控制内容 -->
                <grid-item :x="layout[2].x"
                           :y="layout[2].y"
                           :w="layout[2].w"
                           :h="layout[2].h"
                           :is-draggable="false"
                           :i="layout[2].i" style="height:100%;">
                    <span class="text">属性</span>
                </grid-item>
            </grid-layout>
            <!-- 右侧菜单栏 -->
            <el-menu :collapse="true">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {GridLayout, GridItem} from 'vue-grid-layout'
import DataSource from '../components/leftBar/DataSource'
import TableInfo from '../components/mainContent/TableInfo'

const containerLayout = [
	    {'x': 0, 'y': 0, 'w': 200, 'h': 500, 'i': '0'},
      {'x': 200, 'y': 0, 'w': 960, 'h': 500, 'i': '1'},
	    {'x': 1160, 'y': 0, 'w': 120, 'h': 500, 'i': '2'}
	]
export default {
  name: 'Home',
  components: {
    GridLayout: GridLayout,
    GridItem: GridItem,
    DataSource: DataSource,
    TableInfo: TableInfo
  },
  mounted () {
    this.contentHeight = document.body.clientHeight - 60 - 20
    this.contentWidth = document.body.clientWidth
  },
  watch: {
  },
  methods: {
    listenChild (data) {
        console.log(data)
    },  
    handleSelect (key, keyPath) {
        console.log(key, keyPath)
    },
    testScroll () {
      if (this.testHeight) this.testHeight = false
      else this.testHeight = true
    },
    resizeEvent (i, newH, newW) {
        let nextCtIndex = 1 + parseInt(i)
        let nextContainer = containerLayout.filter(t => t.i === (nextCtIndex + ''))[0]
        let preContainer = containerLayout[parseInt(i)]
        nextContainer.x = containerLayout[parseInt(i)].x + newW
        nextContainer.w = nextContainer.w + preContainer.w - newW
    },
    toggleTabs (tabIndex) {
        this.tabs[tabIndex] = !this.tabs[tabIndex]
        // 后面的往前移动
        let nextCtIndex = 1 + parseInt(tabIndex)
        let nextContainer = containerLayout.filter(t => t.i === (nextCtIndex + ''))[0]
        let preContainer = containerLayout[parseInt(tabIndex)]
        if (this.tabs[tabIndex]) {
           nextContainer.x = nextContainer.x + preContainer.w
           nextContainer.w = nextContainer.w - preContainer.w
        } else {
           nextContainer.x = nextContainer.x - preContainer.w
           nextContainer.w = nextContainer.w + preContainer.w
        }
    }
  },
  data () {
    return {
        testHeight: false,
        activeIndex: '1',
        activeIndex2: '1',
        contentHeight: 400,
        layout: containerLayout,
        draggable: true,
        resizable: true,
        index: 0,
        contentWidth: 500,
        tabs: {
            '0': true,
            '1': true,
            '2': true
        }
    }
  }
}
</script>

<style lang="less" type="text/less">

.vue-grid-item:not(.vue-grid-placeholder) {
    border: 1px solid #DCDFE6;
}

.vue-grid-item .add {
    cursor: pointer;
}

</style>
