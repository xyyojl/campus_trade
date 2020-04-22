<template>
  <div class="header">
    <el-container>
      <el-header>
        <el-row class="header-container">
          <el-col class="logo" :span="3" :offset="1">
            <a href="/">
              <img src="@/assets/images/logo.png" alt />
            </a>
          </el-col>
          <el-col class="home" :span="2">
            <a href="/">首页</a>
          </el-col>
          <el-col class="search" :span="6" :offset="6">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchValue"></el-input>
          </el-col>
          <el-col class="login-bar" :span="5">
            <el-row v-if="token">
              <el-col class="cart-ico" :span="9" :offset="2">
                <router-link to>
                  <!-- <img class="cart-icon" src="@/assets/cart.svg" alt /> -->
                  <span>
                    <router-link to="/cart">购物车</router-link>
                  </span>
                </router-link>
              </el-col>
              <el-col class="member" :span="5">
                <el-menu class="el-menu-demo" mode="horizontal">
                  <el-submenu index="2">
                    <template slot="title">
                      <router-link to>
                        <img src="@/assets/images/default.png" class="avator" alt />
                        <span>{{user_name}}</span>
                      </router-link>
                    </template>
                    <el-menu-item index="2-1">个人中心</el-menu-item>
                    <el-menu-item index="2-2">我的订单</el-menu-item>
                    <el-menu-item index="2-3">发布物品</el-menu-item>
                    <el-menu-item index="2-4">我的收藏</el-menu-item>
                    <el-menu-item index="2-5"><span @click="logout">退出登录</span></el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col class="cart-ico" :span="9" :offset="3">
                <router-link to>
                  <!-- <img class="cart-icon" src="@/assets/cart.svg" alt /> -->
                  <span>
                    <router-link to="/cart">购物车</router-link>
                  </span>
                </router-link>
              </el-col>
              <el-col :span="10" :offset="2">
                <span class="register">
                  <router-link to="/login">登录</router-link>
                  <span style="padding: 0 10px;">|</span>
                  <router-link to="/register">注册</router-link>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      // 设置一个登录标识，表示是否登录
      token: sessionStorage.token || localStorage.token,
      user_name: sessionStorage.user_name || localStorage.user_name,
      user_id: sessionStorage.user_id || localStorage.user_id,
      activeIndex: "1",
      searchValue: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      let arr = ['token','user_id','user_name'];
      arr.forEach(item => {
        this[item] = false;
        console.log(this[item]);
        sessionStorage.removeItem(item);
        localStorage.removeItem(item);

        this.$alert('退出登录成功','校园二手交易平台',{
          confirmButtinText: '确定'
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
$defaultColor: #000;
$fontColor: #2d8cf0;
.el-header {
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
  line-height: 60px;
  font-size: 14px;
  color: $defaultColor;
}
.logo {
  margin-top: 8px;
}
.header-container .home a {
  display: block;
  text-align: center;
  transition: 0.1s;
  color: $defaultColor;
  &:hover {
    color: $fontColor;
    border-bottom: 2px solid $fontColor;
  }
}
/* .cart-ico a:hover {
  color: $fontColor;
  border-bottom: 2px solid $fontColor;
} */
.login-bar a {
  color: $defaultColor;
  &:hover {
    color: $fontColor;
  }
}
.login-bar .avator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>
