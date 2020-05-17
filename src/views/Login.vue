<template>
  <div class="login-box">
    <div class="login">
      <div class="title">
        <span @click="login_type=0" :class="{active:login_type==0}">密码登录</span>
        <span @click="login_type=1" :class="{active:login_type==1}">短信登录</span>
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
          <p @click="forget">忘记密码</p>
        </div>
        <button class="login_btn" @click="handleLogin">登录</button>
        <p class="go_register">
          没有账号
          <router-link to="/register">立即注册</router-link>
        </p>
      </div>
      <div class="inp" v-show="login_type==1">
        <input v-model="username" type="text" placeholder="手机号码" class="user" />
        <div class="sms-box">
          <input v-model="sms" type="text" placeholder="输入验证码" class="sms" />
          <div class="sms-btn" @click="smsHandle">{{sms_text}}</div>
        </div>
        <button class="login_btn" @click="handleSmsLogin">登录</button>
        <p class="go_register">
          没有账号
          <router-link to="/register">立即注册</router-link>
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
      remember: false, // 记住密码
      sms: "",
      is_send: false, // 是否已经发送短信的状态
      send_intervel: 60, // 发送短信的间隔
      sms_text: "点击发送短信" // 发送短信的提示
    };
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.$message({
          message: "请填写完整信息",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post(`${this.$settings.Host}/users/login/`, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res.data);
          // 使用浏览器本地存储保存 token 解构赋值
          let { token, id, username } = res.data.data;
          // 登陆成功
          this.$store.dispatch('setToken', token)
          if (this.remember) {
            // 记住登录
            sessionStorage.clear();
            localStorage.token = token;
            localStorage.user_id = id;
            localStorage.user_name = username;
          } else {
            // 未记住登录
            localStorage.clear();
            sessionStorage.token = token;
            sessionStorage.user_id = id;
            sessionStorage.user_name = username;
          }

          // 跳转到首页
          // this.$router.push("/");
          this.$router.push({ name: "Home" });

          // bug: 登录后跳转
          /* let url = this.$route.query.backUrl; // 获取跳转的url
          if (url) {
            this.$router.push({ path: url }); // 跳转到来的 页面
          } else {
            this.$router.push({ name: "Home" }); // 没有跳转的url 就登录后跳转首页
          } */
        })
        .catch(error => {
          console.log(error);
          // 根据后台返回的信息，提示用户，这里不完善
          this.$message({
            message: "请检查一下你填写账号或密码是否正确",
            type: "warning"
          });
        });
    },
    smsHandle() {
      // 判断是否填写了手机
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$alert("手机号码格式有误!", "警告");
        return false;
      }
      // 判断是否在 60s 内有发送过短信，如果有则，不能点击发送
      if (this.is_send) {
        this.$alert("60s内不能频繁发送短信!", "警告");
        return false;
      }

      let _this = this;

      _this.$axios
        .get(_this.$settings.Host + `/verification/sms/${_this.mobile}/`)
        .then(response => {
          let data = response.data;
          if (data.result == "-1") {
            _this.$alert("发送短信失败!", "错误");
          } else {
            _this.is_send = true;
            _this.$alert("发送短信成功了!", "成功", {
              callback() {
                let num = _this.send_intervel;
                let timer = setInterval(() => {
                  if (num < 1) {
                    clearInterval(timer);
                    _this.sms_text = "点击发送短信";
                    _this.is_send = false;
                  } else {
                    num--;
                    _this.sms_text = num + "后可继续点击发送";
                  }
                }, 1000);
              }
            });
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    forget() {
      this.$message({
        message: "正在施工中，敬请期待",
        type: "warning"
      });
    },
    handleSmsLogin(){
      if (!this.username || !this.sms) {
        this.$message({
          message: "请填写完整信息",
          type: "warning"
        });
        return;
      }
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
  .inp input.code,
  .inp input.sms {
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
  .inp .go_register {
    text-align: center;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0.26px;
    padding-top: 20px;
  }
  .inp .go_register span {
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
  .inp .sms-box {
    position: relative;
  }
  .inp .sms-btn {
    font-size: 14px;
    color: #409eff;
    letter-spacing: 0.26px;
    position: absolute;
    right: 16px;
    top: 13px;
    cursor: pointer;
    overflow: hidden;
    background: #fff;
    border-left: 1px solid #484848;
    padding-left: 16px;
    padding-bottom: 4px;
  }
}
</style>