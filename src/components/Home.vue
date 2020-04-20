<template>
  <div id="home">
    <Header/>
    <Banner/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import Header from './common/Header'
import Banner from './common/Banner'
import Main from './common/Main'
import Footer from './common/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    Main,
    Footer
  },
  data(){
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
