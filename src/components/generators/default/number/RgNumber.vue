<template>
  <div id="rgNumber">
    <el-row :gutter="20">
        <el-col :span="6" align="center">
            <div class="ft"> 数据库： {{fieldInfo.databaseType}}</div>
        </el-col>
        <el-col :span="6" align="center">
            <div class="ft"> 类型： {{fieldInfo.valueType}}</div>
        </el-col>
        <el-col :span="6" align="center">
            <div class="ft"> 长度： {{fieldInfo.length}}</div>
        </el-col>
        <el-col :span="6" align="center">
            <div class="ft"> 范围： 1000  ~  2000</div>
        </el-col>
    </el-row>
    <el-row>
        <el-form :model="formConfig.data" ref="form" label-width="100px">
        <el-form-item label="策略" prop="type">
            <el-select v-model="formConfig.data.strategy" placeholder="请选择" @change="selectChange">
                <el-option
                v-for="item in formConfig.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="表达式" prop="expression">
                <el-input v-model="formConfig.data.expression" :placeholder="expPla"></el-input>
        </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </el-row>
  </div>
</template>

<script>
const formData = {
    strategy: 0,
    expression: ''
}

export default {
    name: 'RgNumber',
    props: {
        config: Object,
        fieldInfo: Object
    },
    mounted () {
    },
    methods: {
        onSubmit () {
            // 组织参数
            const params = {}
            params.dataSourceId = this.fieldInfo.dataSourceId
            params.tableName = this.fieldInfo.tableName
            params.schemaName = this.fieldInfo.schemaName
            params.columnName = this.fieldInfo.columnName
            params.config = JSON.stringify(this.formConfig.data)
            this.$http.post(CONSTANT.API_URL.GENERATOR.SAVE, this.$qs.stringify(params))
            .then((response) => {
                let res = response.data
                if (res && res.code === CONSTANT.ResponseCode.SUCCESS) {
                    this.$message.success(res.msg)
                }
            })
        },
        getOptionVal (key) {
           let options = this.formConfig.options
           if (!options || options.length === 0) return ''
           options.forEach(e => {
               if (e.value === this.formConfig.data.strategy) {
                   this.expPla = e.info.placeholder
               }
           })
        },
        selectChange () {
            this.getOptionVal('placeholder')
        }
    },
    data () {
        return {
            formConfig: {
                data: JSON.parse(JSON.stringify(formData)),
                options: [{
                    label: '随机',
                    value: 0,
                    info: {
                        placeholder: '请输入随机数'
                    }
                }, {
                    label: '递增',
                    value: 1,
                    info: {
                        placeholder: '请输入递增数'
                    }
                }]
            },
            expPla: ''
        }
    }
}

</script>
<style lang="less" type="text/less" scoped>
.ft {
   font-size: 14px;
}
.el-row {
    margin-bottom: 20px;
}
</style>
