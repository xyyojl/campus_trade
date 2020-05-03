<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
#app{
  width: 100vw;
  height: 100vh;
  overflow-x:hidden;
  background-color: #f8f8f9;
}
</style>
