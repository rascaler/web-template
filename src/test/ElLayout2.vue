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
        <grid-layout :layout="layout"
                         :col-num="12"
                         :row-height="30"
                         :is-draggable="draggable"
                         :is-resizable="resizable"
                         :vertical-compact="true"
                         :is-mirrored="true"
                         :use-css-transforms="true" style="width:100%">
                <grid-item :x="layout[0].x"
                           :y="layout[0].y"
                           :w="layout[0].w"
                           :h="layout[0].h"
                           :i="layout[0].i" @resize="resizeEvent">
                    <span class="text">{{layout[0].i}}</span>
                </grid-item>
                <grid-item :x="layout[1].x"
                           :y="layout[1].y"
                           :w="layout[1].w"
                           :h="layout[1].h"
                           :i="layout[1].i">
                    <span class="text">{{layout[1].i}}</span>
                </grid-item>
                <grid-item :x="layout[2].x"
                           :y="layout[2].y"
                           :w="layout[2].w"
                           :h="layout[2].h"
                           :i="layout[2].i" >
                    <span class="text">{{layout[2].i}}</span>
                </grid-item>
                <!-- <grid-item v-for="(item,index) in layout"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                           :key="index">
                    <span class="text">{{item.i}}</span>
                </grid-item> -->
            </grid-layout>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {GridLayout, GridItem} from 'vue-grid-layout'

const testLayout = [
	    {'x': 0, 'y': 0, 'w': 2, 'h': 5, 'i': '0'},
	    {'x': 2, 'y': 0, 'w': 8, 'h': 5, 'i': '1'},
	    {'x': 10, 'y': 0, 'w': 2, 'h': 5, 'i': '2'}
	]
export default {
  name: 'ElLayout2',
  components: {
    GridLayout: GridLayout,
    GridItem: GridItem
  },
  mounted () {
    this.contentHeight = document.body.clientHeight - 60
  },
  watch: {
  },
  methods: {
    handleSelect (key, keyPath) {
        console.log(key, keyPath)
    },
    testScroll () {
      if (this.testHeight) this.testHeight = false
      else this.testHeight = true
    },
    resizeEvent (i, newH, newW) {
        console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW)
        this.layout[1].x = this.layout[1].x + 1 
        this.layout[1].w = this.layout[1].w - 1
    }
  },
  data () {
    return {
        testHeight: false,
        activeIndex: '1',
        activeIndex2: '1',
        contentHeight: 400,
        layout: testLayout,
        draggable: true,
        resizable: true,
        index: 0
    }
  }
}
</script>

<style lang="less" type="text/less">

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    // line-height: 400px;
    height:100%;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #content {
    width: 100%;
}

.vue-grid-layout {
    background: #eee;
}

.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.eventsJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
    height: 100px;
    overflow-y: scroll;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

.vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}

.vue-grid-item.resizing {
    opacity: 0.9;
}

.vue-grid-item.static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
