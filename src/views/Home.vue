<template>
  <div id="home">
    <Banner/>
    <Main/>
  </div>
</template>

<script>
import Banner from '@/components/common/Banner'
import Main from '@/components/common/Main'

export default {
  name: 'Home',
  components: {
    Banner,
    Main
  },
  data(){
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
