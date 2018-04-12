<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$router.push('/Home')
  },
  data () {
    return {}
  }
}
</script>
<style>
html {
  height: 100%;
  width: 100%;
  display: table;
}

body {
  display: table-cell;
  height: 100%;
    width: 100%;
}
</style>
