<template>
  <div class="good-detail">
    <Header />
    <div class="content">
      <div class="thumb-box">
        <div class="img-zoom"></div>
      </div>
      <div class="info-box">
        <div class="top-info">
          <img src="https://api.youzixy.com/public/uploads/avatar/default2.png" alt />
          <span class="username">17353641939</span>
        </div>
        <h3 class="item-title">舒尔升级线mmcx耳机线</h3>
        <div class="item-summary-content">欧亚德3.5立体插头可换立体</div>
        <div class="info-item">价格：200元</div>
        <div class="info-item">地点：五邑大学</div>
        <div class="info-item">时间：2019-12-26</div>
        <div class="function-buttons">
          <el-button type="primary" @click="goShop">立即选购</el-button>
          <el-button type="primary" @click="addToCart">加入购物车</el-button>
          <el-button type="primary" @click="collect">收藏</el-button>
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="comment-top">
        <h4 class="comment-title">商品评价</h4>
        <el-button type="primary" size="mini" icon="el-icon-s-comment" @click="xxx">发表评论</el-button>
      </div>
      <div class="tag-box">
        <el-tag effect="dark" size="small">全部评论</el-tag>
        <el-tag effect="light" size="small">好评</el-tag>
        <el-tag effect="light" size="small">中评</el-tag>
        <el-tag effect="light" size="small">差评</el-tag>
      </div>
      <div class="comment-item-box">
        <div class="comment-item">
          <div class="left">
            <el-avatar src="https://api.youzixy.com/public/uploads/avatar/default9.png" :size="50"></el-avatar>
            <!-- <img src="https://api.youzixy.com/public/uploads/avatar/default9.png" alt /> -->
            <div class="userinfo">
              <div class="name">18707989447</div>
              <div class="time">2020-05-02</div>
            </div>
          </div>
          <div class="right">
            <el-rate v-model="value" disabled></el-rate>
            <div class="user-comment">66666</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <el-dialog title="发表评论" :visible.sync="dialogFormVisible" width="520px">
      <el-rate v-model="starValue"></el-rate>
      <el-input type="textarea" v-model="desc" placeholder="输入评论内容" style="margin-top: 5px;"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "./common/Header";
import Footer from "./common/Footer";

export default {
  name: "GoodDetail",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      value: 3,
      dialogFormVisible: false,
      desc: "",
      starValue: 0,
    };
  },
  methods: {
    goShop() {
      alert("去购买");
    },
    addToCart() {
      alert("加入购物车");
    },
    collect() {
      alert("收藏");
    },
    xxx() {
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible);
    }
  }
};
</script>


<style lang="scss" scoped>
.content {
  width: 1000px;
  margin: 30px auto;
  background: #fff;
  padding: 30px;
  display: flex;
  box-sizing: border-box;
  .thumb-box .img-zoom {
    width: 350px;
    height: 350px;
    background-size: cover;
    background-position: 50%;
    cursor: pointer;
    background-image: url(https://api.youzixy.com/public/uploads/attach/2019/12/26/5e03b0fabcfad.jpeg);
  }
  .info-box {
    margin-left: 30px;
    font-size: 14px;
    .top-info {
      font-size: 14px;
      color: #07111b;
      vertical-align: middle;
    }
    .top-info img {
      color: #fff;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 5px;
    }
    .top-info .username {
      display: inline-block;
      margin: 6px 0;
    }
    .item-title {
      margin: 12px 0;
      color: #17233d;
      font-weight: 700;
      font-size: 16px;
    }
    .item-summary-content {
      color: #616776;
      line-height: 24px;
    }
    .info-item {
      color: #616776;
      line-height: 32px;
    }
    .function-buttons {
      margin-top: 20px;
    }
  }
}
.comment {
  width: 1000px;
  margin: 30px auto;
  background: #fff;
  padding-bottom: 20px;
  box-sizing: border-box;
  .comment-top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 10px;
    line-height: 28px;
    .comment-title {
      font-size: 14px;
      font-weight: 700;
      padding-left: 20px;
    }
  }
  .tag-box {
    padding: 20px;
    span {
      margin-right: 15px;
      cursor: pointer;
    }
  }
  .comment-item-box {
    .comment-item {
      display: flex;
      padding: 20px;
      &:not(:first-child) {
        border-bottom: 1px solid #eee;
      }
      .left {
        display: flex;
        .userinfo {
          margin: 0 10px;
          .name {
            font-weight: 700;
            font-size: 14px;
            margin-top: 3px;
          }
          .time {
            color: #808695;
            margin-top: 5px;
          }
        }
      }
      .right {
        color: #616776;
        font-size: 14px;
        .el-rate {
          padding: 5px 0;
        }
      }
    }
  }
  /* comment-title  tag-box comment-item-box comment-item*/
}
</style>