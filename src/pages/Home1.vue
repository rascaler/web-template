<template>
  <div id="home">
    <el-container>
      <el-header style="padding:0px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">数据工厂</el-menu-item>
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
        <el-aside width="250px" style="line-height:0px;">
          <el-row type="flex">
              <el-dropdown trigger="click" placement="bottom-start">
                  <el-button icon="el-icon- fa fa-plus" size="mini"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Oracle</el-dropdown-item>
                  <el-dropdown-item>MySql</el-dropdown-item>
                  <el-dropdown-item>SQL Server</el-dropdown-item>
                  <el-dropdown-item>DB2</el-dropdown-item>
                  <el-dropdown-item>PostgreSQL</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="click" placement="bottom-start">
                <el-button icon="el-icon- fa fa-exchange" size="mini"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="dataSource in dataSourceList" :key="dataSource.id" @click.native="getDataSourceTree(dataSource.id)">
                    {{dataSource.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="click" placement="bottom-start">
                  <el-button icon="el-icon- fa fa-cogs" size="mini"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>导出model</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button icon="el-icon- fa fa-refresh" size="mini"></el-button>
          </el-row>
          <el-row type="flex">
              <el-tree
                :data="dsTreeConfig.data"
                node-key="uid"
                default-expand-all
                highlight-current
                @node-click="handleNodeClick"
                :expand-on-click-node="false" style="flex:1" ref="dsTree">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                      <i v-if="data.type === 0" class="el-icon- fa fa-database"></i>
                      <i v-if="data.type === 1" class="el-icon- fa fa-database"></i>
                      <i v-if="data.type === 2" class="el-icon- fa fa-table"></i>
                      {{ node.label }}
                    </span>
                    <span style="margin-left:10px;">
                        <el-dropdown trigger="click" placement="bottom-start">
                          <el-button type="text" size="mini" icon="el-icon- fa fa-cog" @click="() => append(data)"></el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>导出model</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </span>
                </el-tree>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
             <el-row>
              <el-table :data="fieldTableConfig.data" stripe border @row-dblclick="rowDoubleClick" @expand-change="getGeneratorConfig">
                <el-table-column label="生成器" prop="comment" width="200" align="center">
                  <el-table-column label="配置" prop="comment" type="expand" width="80"></el-table-column>
                  <el-table-column label="类型" prop="name" width="120" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="name" label="字段名" width="120" align="center"></el-table-column>
                <el-table-column prop="dataType" label="类型" width="100" align="center"></el-table-column>
                <el-table-column prop="length" label="长度" width="100" align="center"></el-table-column>
                <el-table-column prop="isNullable" label="是否为空" width="100" align="center"></el-table-column>
                <el-table-column prop="fieldDefault" label="默认值" width="180" align="center"></el-table-column>
                <el-table-column prop="comment" label="注释" align="center"></el-table-column>
              </el-table> 
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
  name: 'home',
  mounted () {
    this.contentHeight = document.body.clientHeight - 60
    this.getAllDataSources()
  },
  watch: {
  },
  methods: {
    handleSelect (key, keyPath) {
        console.log(key, keyPath)
    },
    getAllDataSources () {
      this.$http.get(CONSTANT.API_URL.DATA_SOURCE.GET_SIMPLE_ALL)
          .then((response) => {
              let res = response.data
              if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
                  this.dataSourceList = res.data
              }
          })
    },
    getDataSourceTree (dataSourceId) {
      this.$http.get(CONSTANT.API_URL.DATA_SOURCE.GET_DATA_SOURCE_TREE, {
        params: {
          id: dataSourceId
        }
      }).then((response) => {
              let res = response.data
              if (res && res.code !== CONSTANT.ResponseCode.SUCCESS) {
                  this.$Message.error(res.msg || '操作失败')
                  this.dsTreeConfig.data = []
                  return
              }
              this.dsTreeConfig.data = [res.data]
              this.$nextTick(() => {
                  // tree dom更新后设置
                  if (res.data) this.$refs.dsTree.setCurrentKey(res.data.uid)
              })
          })
    },
    getTableFields (table) {
      this.$http.get(CONSTANT.API_URL.TABLE.GET_TABLE_FIELDS, {
        params: {
          schema: table.schema,
          table: table.name
        }
      }).then((response) => {
          let res = response.data
          if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
              this.fieldTableConfig.data = res.data
          }
      })
    },
    handleClick () {
      alert(1)
    },
    handleNodeClick (data) {
       if (data.type === 2) {
         this.getTableFields({schema: data.schemaName, name: data.name})
       }
    },
    rowDoubleClick (row, event) {
       console.log(row)
    },
    getGeneratorConfig (row, expandedRows) {
      console.log(row)
    }
  },
  data () {
    return {
        activeIndex: '1',
        activeIndex2: '1',
        contentHeight: 400,
        dsTreeConfig: {
            data: [],
            currentKey: '3'
        },
        fieldTableConfig: {
          data: []
        },
        dataSourceList: []
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
