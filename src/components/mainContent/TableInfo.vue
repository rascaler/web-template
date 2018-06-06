<template>
  <div id="TableInfo">
    <el-row type="flex">
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
  </div>
</template>

<script>

export default {
  name: 'TableInfo',
  components: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    rowDoubleClick (row, event) {
       console.log(row)
    },
    getGeneratorConfig (row, expandedRows) {
      console.log(row)
    }
  },
  data () {
    return {
      fieldTableConfig: {
          data: []
        }
    }
  }
}
</script>

<style lang="less" type="text/less">

</style>
