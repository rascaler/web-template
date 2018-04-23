<template>
  <div id="Test" style="display:flex;height:100%;width:100%;">
    <Layout style="display:flex;width:100%;">
      <Sider hide-trigger :style="{background: '#fff', 'border-right': '1px solid #d7dde4'}">
            <div>
                <Button type="ghost" icon="android-add" @click="showModal = true"></Button>
                <Dropdown placement="right-start" trigger="click" :visible="visible" @on-click="changeDataSource">
                  <Button type="ghost" icon="arrow-swap" @click="showDropDown"></Button>
                  <DropdownMenu slot="list">
                       <DropdownItem v-for="dataSource in dataSourceList" :key="dataSource.id" :name="dataSource.id">{{dataSource.name}}</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </div>
            <Tree :data="data1"></Tree>
      </Sider>
      <Content :style="{minHeight: '280px', background: '#fff', padding: '20px'}">
          <ButtonGroup>
              <Button type="ghost" icon="ios-upload">导出文档</Button>
              <Button type="ghost" icon="code-download">生成模型</Button>
              <Button type="ghost" icon="archive">下载</Button>
              <Button type="ghost" icon="ios-color-filter-outline"></Button>
          </ButtonGroup>
          <Table border :columns="columns2" :data="data2"></Table>
      </Content>
      <Modal v-model="showModal" title="添加数据库" @on-ok="saveSchema" @on-visible-change="changeVisible">
        <Form :model="formConfig.data" :label-width="80">
        <FormItem label="数据源名称"> 
            <Input v-model="formConfig.data.name" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="数据源"> 
            <Input v-model="formConfig.data.url" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="用户名">
                       <Input v-model="formConfig.data.username" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="密码">
                       <Input v-model="formConfig.data.password" placeholder="Enter something..."></Input>
        </FormItem>
    </Form>
    </Modal>                   
    </Layout>
  </div>
</template>

<script>
import {Icon, Dropdown, DropdownMenu, DropdownItem} from 'iView'
const formData = {
  url: '',
  username: '',
  password: '',
  name: ''
}

export default {
  name: 'Test',
  mounted () {
    this.getAllDataSources()
  },
  methods: {
    getTableFields (table) {
      this.$http.get(CONSTANT.API_URL.TABLE.GET_TABLE_FIELDS, {
        params: {
          schema: table.schema,
          table: table.name
        }
      }).then((response) => {
              let res = response.data
              if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
                  this.data2 = res.data
              }
          }).catch((response) => {
          })
    },
    getTables () {
      this.$http.get(CONSTANT.API_URL.TABLE.GET_TABLES)
          .then((response) => {
              let res = response.data
              if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
                  res.data.forEach(c => {
                    c.render = this.getTableRender()
                    c.title = c.name
                    c.visible = false
                  })
                  this.data1[0].children = res.data
              }
          }).catch((response) => {
          })
    },
    getDataSourceTree (dataSourceId) {
      this.$http.get(CONSTANT.API_URL.DATA_SOURCE.GET_DATA_SOURCE_TREE, {
        params: {
          id: dataSourceId
        }
      }).then((response) => {
              let res = response.data
              if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
                  res.data.forEach(c => {
                    c.render = this.getTableRender()
                    c.title = c.name
                    c.visible = false
                    if (c.type === 1) {
                      c.expand = true
                      c.icon = ''
                    }
                    if (c.type === 2) c.icon = ''
                    if (c.type === 3) c.icon = ''
                  })
                  this.data1[0].children = res.data
              }
          }).catch((response) => {
          })
    },
    getAllDataSources () {
      this.$http.get(CONSTANT.API_URL.DATA_SOURCE.GET_SIMPLE_ALL)
          .then((response) => {
              let res = response.data
              if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
                  this.dataSourceList = res.data
              }
          }).catch((response) => {
          })
    },
    changeDataSource (dataSourceId) {
      this.getDataSourceTree(dataSourceId)
    },
    saveSchema () {
      this.$http.post(CONSTANT.API_URL.SCHEMA.SAVE, this.$qs.stringify(this.formConfig.data))
      .then((response) => {
        let res = response.data
        if (res && res.code === window.CONSTANT.ResponseCode.SUCCESS) {
          // 保存成功
           this.$Message.success(res.msg)
        } else {
           this.$Message.error(res.msg)
        }
      }).catch((response) => {
           this.$Message.error('保存失败')
      })
    },
    getTableRender () {
      let tbRender = (h, { root, node, data }) => {
                        let names = ['冰糖葫芦', '北京烤鸭']
                        return (<div class={data.selected ? 'selected' : ''} style='display:inline-block;cursor:pointer;'> 
                                <Icon type="ios-grid-view" size="15"></Icon> 
                                <div style="display:inline-block;margin-left:3px;position:relative;" onClick={ (e) => { this.getTableFields(data) } } on-contextmenu={(e) => { return this.showLeftMenu(e, data) }} >
                                <Dropdown placement="right-start" trigger="custom" visible={ data.visible } on-on-clickoutside = { (e) => { data.visible = false }}>
                                   <span>{data.title}</span>
                                   <DropdownMenu slot="list">
                                   {
                                     names.map(function (name) {
                                      return <DropdownItem>{name}</DropdownItem>
                                    })
                                   }
                                   </DropdownMenu>
                                </Dropdown>
                                </div>
                            </div>)
                    }
      return tbRender
    },
    showLeftMenu (e, data) {
      e.preventDefault()
      // 菜单显示
      // 所有都关闭
      data.visible = true
    },
    exportTables (schema, tables) {
       let params = '?schema=' + schema + '&' + 'tables=' + tables
       window.open(CONSTANT.API_URL.TABLE.EXPORT_TABLE_DOC + params)
    },
    changeVisible (visible) {
      if (visible) this.formConfig.data = JSON.parse(JSON.stringify(formData))
    },
    showDropDown () {
       this.visible = true
    },
    changeVisible2 () {
      return true
    }
  },
  data () {
    return {
        dataSourceList: [],
        visible: false,
        showModal: false,
        selectTable: '',
        layoutHeight: 280,
        formConfig: {
          data: JSON.parse(JSON.stringify(formData))
        },
        tree: [],
        data1: [
            {
                title: 'datasource',
                expand: true,
                render: (h, { root, node, data }) => {
                        return (<div style='display:inline-block;width:100%;'>
                                <Icon type="soup-can" size="15"></Icon>
                                <span style="display:inline-block;margin-left:3px;">{data.title}</span>
                            </div>)
                },
                children: []
            }
        ],
        columns2: [
            {
                title: '字段名',
                key: 'name'
            }, {
                title: '类型',
                key: 'dataType'
            }, {
                title: '长度',
                key: 'length'
            }, {
                title: '能否为空',
                key: 'isNullable'
            }, {
                title: '默认值',
                key: 'fieldDefault'
            }, {
                title: '注释',
                key: 'comment'
            }
        ],
        data2: []
    }
  }
}
</script>

<style lang="less" type="text/less">
.ivu-table th,.ivu-table td {
    height: 36px;
}
</style>
