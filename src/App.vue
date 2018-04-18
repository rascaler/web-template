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
}
</style>
