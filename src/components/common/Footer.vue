<template>
  <div class="footer">
    <div class="footerMain">
      <router-link to>关于我们</router-link>
      <router-link to>联系我们</router-link>
      <router-link to>商务合作</router-link>
      <router-link to>帮助中心</router-link>
      <router-link to>意见反馈</router-link>
      <router-link to>新手指南</router-link>
    </div>
    <div class="copyright">
      <p>版权所有 © All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>


<style lang="scss" scoped>
.footer {
  background-color: #282c36;
  display: flex;
  flex-direction: column;
  color: #999;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}
.footerMain {
  width: 100%;
  height: 50px;
}
.footerMain a {
  margin: 0 20px;
  color: #999;
}
.copyright {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #22252e;
}
</style>