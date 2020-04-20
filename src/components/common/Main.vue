<template>
  <div class="main">
      <div class="product-container" v-if="content">
          
          <!--  v-else -->
      </div>
    <div class="no-content">
      <img src="@/assets/images/noGoods.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        content: true
    };
  }
};
</script>

<style lang="scss" scoped>
.no-content {
  text-align: center;
  margin: 150px auto;
  & > img {
    width: 250px;
  }
}
</style>
