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
        <el-aside width="200px" style="line-height:0px;">
          <el-row>
                <el-dropdown trigger="click" placement="bottom-start">
                  <el-button icon="el-icon-edit"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item>双皮奶</el-dropdown-item>
                  <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="click" placement="bottom-start">
                  <el-button icon="el-icon-edit"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item>双皮奶</el-dropdown-item>
                  <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <el-row>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              <div v-if="testHeight">
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>  Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>  Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>  Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>  Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              Main<br>
              </div>
              <i class="fa fa-camera-retro fa-lg"></i> fa-lg
              <el-button type="primary" icon="el-icon- fa fa-camera-retro" @click="testScroll">搜索</el-button> 
            </el-row>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ElLayout1',
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
    }
  },
  data () {
    return {
        testHeight: false,
        activeIndex: '1',
        activeIndex2: '1',
        contentHeight: 400
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
</style>
