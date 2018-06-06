<template>
  <div id="rgNumberTest">
      <rg-number :fieldInfo="fieldInfo"> </rg-number>
  </div>
</template>
<script>
import RgNumber from '@/components/generators/default/number/RgNumber'
export default {
  name: 'rgNumberTest',
  components: {
      RgNumber
  },
  methods: {
  },
  data () {
      return {
          fieldInfo: {
              databaseType: 'MySql',
              valueType: 'int',
              length: 11,
              schemaName: 'rbac',
              tableName: 'tb_user',
              columnName: 'id',
              dataSourceId: 3
          }
      }
  }
}
</script>
