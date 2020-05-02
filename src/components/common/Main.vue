<template>
  <div class="main">
    <div class="product-container" v-if="content">
      <Waterfall :productList="productList" :row="false" :column="5"/>
      <!-- <div class="product-box" v-for="product in productList" :key="product.id">
        <a href="#">
          <div class="img-box">
            <img
              :src="product.image"
              alt
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{product.store_name}}</h3>
            <div class="view">
              <span>更新于{{product.refresh_time}}</span>
              <span>{{product.browse}}人浏览</span>
            </div>
            <div class="detail">{{product.store_info}}</div>
            <div class="price">
              <span>￥{{product.price}}</span>
              <span>{{product.slogan}}</span>
            </div>
          </div>
        </a>
      </div> -->
    </div>
    <div class="no-content" v-else>
      <img src="@/assets/images/noGoods.png" alt />
    </div>
  </div>
</template>

<script>
import Waterfall from '@/components/Waterfall.vue'

export default {
  name: "",
  data() {
    return {
      content: true,
      productList: []
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      // 获取物品的分类
      this.$axios.get("/api/get_product_list.json").then(res => {
        this.productList = Object.assign(res.data.data.list);
        console.log(this.productList);
      });
    }
  },
  components: {
    Waterfall
  }
};
</script>

<style lang="scss" scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.product-container {
  min-height: 2000px;
  width: 1200px;
  margin: 30px auto;
  /* .product-box {
    width: 224px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 36px;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
    .img-box {
      width: 224px;
      // height: 228px;
      overflow: hidden;
      transition: all 0.3s linear;
    }
    .img-box img {
      width: 224px;
      // height: 224px;
      transition: all 0.3s;
      border-radius: 5px 5px 0 0;
      &:hover {
        transform: scale(1.08);
      }
    }
    .product-info {
      padding: 0 10px;
      padding-bottom: 5px;
    }
    .product-info .product-name {
      font-size: 16px;
      line-height: 24px;
      height: 48px;
      font-weight: normal;
      margin-top: 10px;
      word-break: break-all;
      word-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #2b333b;
    }
    .product-info .view {
      display: flex;
      font-size: 12px;
      line-height: 20px;
      color: #999;
      transition: all 0.3s linear;
      justify-content: space-between;
    }
    .product-info .detail {
      margin-top: 4px;
      margin-bottom: 4px;
      color: #93999f;
      max-height: 48px;
      word-break: break-all;
      word-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #2b333b;
    }
    .price {
      display: flex;
      justify-content: space-between;
      line-height: 24px;
      color: #2d8cf0;
    }
    .price span:nth-child(1) {
      color: #f01414;
    }
  } */
}
.no-content {
  text-align: center;
  margin: 150px auto;
  & > img {
    width: 250px;
  }
}
</style>
