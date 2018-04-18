<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            <router-link to="/Test">test</router-link>
                        </MenuItem>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="stats-bars"></Icon>
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Breadcrumb :style="{margin: '16px 0',padding: '0 20px'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Layout :style="{height: layoutHeight + 'px'}">
                
                <Content :style="{background: '#fff', height: '100%'}">
                    <router-view></router-view>
                    <!-- <Layout>
                        <Sider hide-trigger :style="{background: '#fff', 'border-right': '1px solid #d7dde4'}">
                           <Tree :data="data1"></Tree>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <Table border :columns="columns2" :data="data2"></Table>
                        </Content>
                    </Layout> -->
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2018 &copy; rascaler</Footer>
        </Layout>
    </div>
</div>
</template>
<script>
    export default {
        name: 'App',
        mounted () {
            // 调整高度自适应
            this.layoutHeight = document.body.clientHeight - 60 - 75 - 53
        },
        methods: {
            a () {
                alert(1)
            }
        },
        data () {
            return {
                layoutHeight: 280
            }
        }
    }
</script>
<style lang="less" type="text/less">
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.selected {
    background: #d5e8fc;
}
// .ivu-table th,.ivu-table td {
//     height: 36px;
// }
</style>
