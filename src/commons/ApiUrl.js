const API_URL = {
  ORIGIN: 'http://192.168.199.113:8081/readygo/',
  SCHEMA: {
    SAVE: 'schema/save'
  },
  TABLE: {
    GET_TABLE_FIELDS: 'table/getTableFields',
    GET_TABLES: 'table/getTables',
    EXPORT_TABLE_DOC: 'table/exportTableDoc'
  },
  DATA_SOURCE: {
    GET_DATA_SOURCE_TREE: 'dataSource/getDataSourceTree',
    GET_SIMPLE_ALL: 'dataSource/getSimpleAll'
  },
  GENERATOR: {
    NUMBER: 'generator/number',
    SAVE: 'generator/save'
  }
}

export default API_URL
