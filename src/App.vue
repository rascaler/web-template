<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
  },
  data () {
    return {}
  }
}
</script>
<style>
/*高度自适应*/
.fa {
  font-family: FontAwesome!important;
}

html {
  height: 100%;
  width: 100%;
  display: table;
  margin: 0px;
  padding: 0px;
}

body {
  display: table-cell;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #495060;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}
</style>
