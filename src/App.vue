<template>
  <div id="app">
    <!-- <Header></Header> -->
    <router-view class="header" name="header"></router-view>
    <router-view class="content"></router-view>
    <router-view class="footer" name="footer"></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// import Header from './components/common/Header'
// import Footer from './components/common/Footer'

export default {
  name: 'App',
  components: {
    // Header,
    // Footer
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
.content{
  min-height: 800px;
  padding: 30px 0;
}
</style>
