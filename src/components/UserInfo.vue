<template>
  <div class="user-info">
    <Header />
    <div class="content">
      <div class="content-left">
        <h3 class="title">个人中心</h3>
        <el-menu style="min-height:600px;">
          <el-menu-item :index="index.toString()" v-for="(item,index) in menu" :key="index" @click="change(item.name)">
            <span slot="title">{{item.value}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <Content :name="currentName"></Content>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./common/Header";
import Footer from "./common/Footer";
import Content from "./common/Content";

export default {
  name: "UserInfo",
  components: {
    Header,
    Footer,
    Content
  },
  data() {
    return {
      menu: [
        {
          name: "user_info",
          value: "个人信息"
        },
        {
          name: "my_order",
          value: "我的订单"
        },
        {
          name: "my_publish",
          value: "我的发布"
        },
        {
          name: "publish",
          value: "我要发布"
        },
        {
          name: "collect",
          value: "我的收藏"
        },
        {
          name: "cart",
          value: "购物车"
        },
        {
          name: "password",
          value: "密码修改"
        }
      ],
      formLabelAlign: {
        name: "",
        school: "",
        address: ""
      },
      imageUrl: "https://api.youzixy.com/public/uploads/avatar/default3.png",
      disabled: true,
      currentName: 'user_info'
    };
  },
  methods: {
    change(val) {
      this.currentName = val;
    }
  }
};
</script>


<style lang="scss" scoped>
.content {
  width: 1000px;
  margin: 30px auto;
  background: #fff;
  min-height: 600px;
  display: flex;
  .content-left {
    width: 200px;
    min-height: 600px;
    text-indent: 2em;
    .title {
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      padding-left: 1em;
      text-indent: 0;
      color: #999;
      font-weight: normal;
    }
  }
  /* .content-box {
    min-height: 600px;
    width: 760px;
    padding-left: 30px;
    .el-form {
      margin-top: 40px;
      .el-input {
        width: 250px;
      }
    }
    .function-buttons{
      margin-left: 80px;
    }
  } */
}
</style>