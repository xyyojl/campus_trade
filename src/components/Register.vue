<template>
  <div class="register-box">
    <div class="register">
      <div class="title">注册校园易物</div>
      <div class="inp">
        <input type="text" placeholder="用户名" class="username" v-model="username" />
        <input type="password" placeholder="密码" v-model="password" />
        <input type="password" placeholder="确认密码" v-model="password2" />
        <input type="text" placeholder="学校名称" v-model="school" />
        <input v-model="mobile" type="text" placeholder="手机号码" />
        <div class="sms-box">
          <input v-model="sms" type="text" placeholder="输入验证码" class="sms" />
          <div class="sms-btn" @click="smsHandle">{{sms_text}}</div>
        </div>
        <button class="register-btn" @click="registerHander">注册</button>
        <p class="go_login">
          已有账号
          <router-link to="/login">直接登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      validateResult: false,
      school: "",
      mobile: "",
      sms: "",
      is_send: false, // 是否已经发送短信的状态
      send_intervel: 60, // 发送短信的间隔
      sms_text: "点击发送短信" // 发送短信的提示
    };
  },
  methods: {
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
    // 提交注册信息
    registerHander() {
      // 首先需要判断输入的内容是否合理
      if (
        !this.username ||
        !this.password ||
        !this.password2 ||
        !this.school ||
        !this.mobile ||
        !this.sms
      ) {
        this.$message({
          message: "请填写完整信息",
          type: "warning"
        });
        return;
      }

      if (this.password !== this.password2) {
        this.$message({
          message: "请确认你填写的密码是否一致",
          type: "warning"
        });
        return;
      }

      this.$axios
        .post(`${this.$settings.Host}/users/register/`, {
          username: this.username,
          password: this.password,
          password2: this.password2,
          school: this.school,
          mobile: this.mobile,
          sms_codes: this.sms
        })
        .then(response => {
          let _this = this;
          _this.$alert("注册成功", "校园易物", {
            callback() {
              let data = response.data;
              let { token, id, username } = response.data;
              console.log(data);
              // 保存登录状态
              sessionStorage.token = token;
              sessionStorage.user_id = id;
              sessionStorage.user_name = username;

              // 登录后跳转
              var url = _this.$route.query.backUrl;  // 获取跳转的url
              if(url){
                _this.$router.push({path:url})  // 跳转到来的 页面
              }else {
                _this.$router.push({name:'Home'})  // 没有跳转的url 就登录后跳转首页
              }
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.register-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f8f8f9;
  background-image: url(../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  & .register {
    box-sizing: border-box;
    position: absolute;
    width: 400px;
    height: 600px;
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
  & .title {
    font-size: 20px;
    letter-spacing: 0.32px;
    margin-bottom: 20px;
    padding-top: 30px;
    text-align: center;
  }
  .inp {
    width: 100%;
    margin: 0 auto;
  }
  .inp input {
    outline: 0;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
    margin-bottom: 16px;
  }
  .sms-box {
    position: relative;
  }
  .sms-btn {
    font-size: 14px;
    // color: #ffc210;
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
  .inp input:last-child {
    margin-bottom: 0;
  }
  .register-btn {
    width: 100%;
    height: 45px;
    background: #409eff;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.26px;
    margin-top: 20px;
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
  .inp .go_login a {
    color: #409eff;
  }
}
</style>