<template>
  <div class="login-box">
    <div class="login">
      <div class="title">
        <span @click="login_type=0" class="active">密码登录</span>
        <span @click="login_type=1">短信登录</span>
      </div>
      <div class="inp" v-if="login_type==0">
        <input v-model="username" type="text" placeholder="用户名 / 手机号码" class="user" />
        <input v-model="password" type="password" name class="pwd" placeholder="密码" />
        <div id="geetest1"></div>
        <div class="rember">
          <p>
            <input type="checkbox" class="no" name="a" v-model="remember" />
            <span>记住密码</span>
          </p>
          <p>忘记密码</p>
        </div>
        <button class="login_btn" @click="handleLogin">登录</button>
        <p class="go_login">
          没有账号
          <span>立即注册</span>
        </p>
      </div>
      <div class="inp" v-show="login_type==1">
        <input v-model="username" type="text" placeholder="手机号码" class="user" />
        <input v-model="code" type="text" class="code" placeholder="短信验证码" />
        <button id="get_code" class="get_code">获取验证码</button>
        <button class="login_btn">登录</button>
        <p class="go_login">
          没有账号
          <span>立即注册</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login_type: 0,
      username: "",
      password: "",
      code: "",
      remember: false // 记住密码
    };
  },
  methods: {
    handleLogin() {
      this.$axios
        .post(`${this.$settings.Host}/users/login/`, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res.data);
          // 使用浏览器本地存储保存token 解构赋值
          let {token, id, username} = res.data;
          if (this.remember) {
            // 记住登录
            sessionStorage.clear();
            localStorage.token = token;
            localStorage.id = id;
            localStorage.username = username;
          } else {
            // 未记住登录
            localStorage.clear();
            sessionStorage.token = token;
            sessionStorage.id = id;
            sessionStorage.username = username;
          }
          // 页面跳转到上一个页面，也可以使用 this.$router.push('/') 回到首页
          // this.$router.go(-1); // 有这个需求
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f8f8f9;
  background-image: url(../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  & .login {
    box-sizing: border-box;
    position: absolute;
    width: 400px;
    height: 400px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    padding: 0 20px;
  }
  & .login .title {
    font-size: 20px;
    color: #9b9b9b;
    letter-spacing: 0.32px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-around;
    padding: 30px 60px 0 60px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  & .login .title span.active {
    color: #4a4a4a;
    border-bottom: 2px solid #84cc39;
  }
  .inp {
    width: 100%;
    margin: 0 auto;
  }
  .inp input.user,
  .inp input.pwd,
  .inp input.code {
    outline: 0;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
  }
  .inp input.user {
    margin-bottom: 16px;
  }
  .inp .rember {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
    vertical-align: middle;
  }
  .inp .rember p:first-of-type {
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: 0.19px;
    margin-left: 22px;
    display: flex;
    align-items: center;
  }
  .inp .rember p:nth-of-type(2) {
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0.19px;
    cursor: pointer;
  }
  .inp .rember p span {
    display: inline-block;
    font-size: 12px;
    width: 100px;
  }
  .login_btn {
    width: 100%;
    height: 45px;
    background: #84cc39;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.26px;
    margin-top: 30px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .inp .go_login {
    text-align: center;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0.26px;
    padding-top: 20px;
  }
  .inp .go_login span {
    color: #84cc39;
    cursor: pointer;
  }
  .inp input.code {
    width: 200px;
  }
  .inp .get_code {
    width: 130px;
    height: 45px;
    margin-left: 28px;
  }
}
</style>