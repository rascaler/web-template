<template>
  <div id="DataSource">
    <!-- 工具栏按钮 -->
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
        <el-button icon="el-icon- fa fa-refresh" size="mini" @click="childEvent"></el-button>
    </el-row>

   <!-- 数据源列表 -->
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
  </div>
</template>

<script>

export default {
  name: 'DataSource',
  components: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
    },
    childEvent () {
        this.$emit('childEvent', {a: 1})
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

</style>
