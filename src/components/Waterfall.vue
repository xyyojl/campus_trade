<template>
  <div :class="{'waterfall-wrap': true, row: row}" ref="container">
    <template v-if="row">
      <div v-for="(item, index) of productList" :key="index" class="row-item">
        <img :src="item.url" :style="{height: `${height}px`}" />
      </div>
      <div :style="{height: `${height}px`}" class="last-box"></div>
    </template>
    <template v-else>
      <div class="product-box column-item" v-for="product in productList" :key="product.id">
        <a href="#">
          <div class="img-box">
            <img :src="product.image" alt />
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
              <span>五邑大学</span>
              <!-- {{product.slogan}} -->
            </div>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    productList: {
      type: Array,
      required: true
    },
    row: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 4
    },
    height: {
      type: Number,
      default: 225
    }
  },
  data() {
    return {
      itemWidth: 0,
      columnData: []
    };
  },
  watch: {
    productList() {
      this.renderList();
    }
  },
  mounted() {
    this.renderList();
  },
  methods: {
    renderList() {
      // 横向排列使用css进行排列
      // 纵向排列使用绝对定位排列
      if (!this.row) {
        // 存储每列已排列的高度 0 - 4
        this.columnData = [];
        // 计算出每列应该占总宽度的百分比
        this.itemWidth = `${100 / this.column}%`;
        setTimeout(() => {
          const boxes = this.$refs.container.getElementsByClassName(
            "column-item"
          );
          for (let i = 0; i < boxes.length; i++) {
            this.setElementStyle(
              boxes[i],
              this.productList[i],
              i,
              boxes[i].offsetHeight
            );
          }
        }, 1200);
      }
    },
    setElementStyle(element, list, index, height) {
      if (index < this.column) {
        element.style.left = `${index * (100 / this.column)}%`;
        this.columnData[index] = this.columnData[index]
          ? this.columnData[index] + height
          : height;
      } else {
        let current = index % this.column;
        element.style.left = `${current * (100 / this.column)}%`;
        element.style.top = `${this.columnData[current] + 20}px`;
        this.columnData[current] = this.columnData[current] + 20;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.waterfall-wrap {
  position: relative;
  .column-item {
    position: absolute;
    transition: all 0.3s ease;
    box-sizing: border-box;
    img {
      max-width: 100%;
    }
  }
  &.row {
    display: flex;
    flex-wrap: wrap;
    .row-item {
      margin: 5px;
      flex-grow: 1;
      font-size: 0;
      box-sizing: border-box;
      transition: all 0.3s ease;
      img {
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
      }
    }
    .last-box {
      margin: 5px;
      flex-grow: 999;
    }
  }
  .product-box {
    width: 224px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
    .img-box {
      width: 224px;
      overflow: hidden;
      transition: all 0.3s linear;
    }
    .img-box img {
      width: 224px;
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
    }
    .product-info .price {
      display: flex;
      justify-content: space-between;
      line-height: 24px;
      color: #2d8cf0;
    }
    .product-info .price span:nth-child(1) {
      color: #f01414;
    }
  }
}
</style>