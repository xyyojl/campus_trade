<template>
  <div class="banner-container clearfix">
    <ul class="menuContent" >
      <li class="item" v-for="(tag,index) in taglist" :key="tag.id" @mouseenter="enter(index)" @mouseleave="leave()">
        <a href="javascript:void(0)">
          <span class="product group">{{tag.cate_name}}</span>
          <i class="el-icon-caret-right"></i>
        </a>
      </li>
    </ul>
    <div class="right-box">
      <el-carousel class="banner" height="360px">
        <el-carousel-item v-for="item in bannerImg" :key="item.id">
          <img :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div :class="['sub-menu',{ active: isActive }]" ref="subMenu" 
      v-for="(subitem,index) in subitemList" 
      :key="index" 
      v-show="currentIndex === index"
      @mouseenter="enter(index)"
      @mouseleave="leave()">
      <div class="divider">
        <span>{{subitemTitle}}</span>
      </div>
      <ul class="sub-item clearfix">
        <li class="item fl" v-for="item in subitem" :key="item.id">
          <img :src="item.pic" alt />
          <div>{{item.cate_name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      taglist: [
       /*  { id: 1, value: "数码产品" },
        { id: 2, value: "书籍教材" },
        { id: 3, value: "衣鞋帽伞" },
        { id: 4, value: "代步工具" },
        { id: 5, value: "体育健身" },
        { id: 6, value: "家用电器" },
        { id: 7, value: "日常用品" },
        { id: 8, value: "虚拟产品" },
        { id: 9, value: "手工设计" },
        { id: 10, value: "乐器" },
        { id: 11, value: "其他" } */
      ],
      subitemList: [
       /*  {
          iv: 1,
          value: "手机1",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca4f919c70.jpg"
        },
        {
          iv: 2,
          value: "手机2",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca56215d58.jpg"
        },
        {
          iv: 3,
          value: "手机3",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca5ad15eea.png"
        },
        {
          iv: 4,
          value: "手机4",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca5da97966.jpg"
        },
        {
          iv: 5,
          value: "手机5",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca680b8c9a.jpg"
        },
        {
          iv: 6,
          value: "手机6",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca4f919c70.jpg"
        },
        {
          iv: 7,
          value: "手机7",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca4f919c70.jpg"
        },
        {
          iv: 8,
          value: "手机8",
          imgUrl:
            "https://api.youzixy.com/public/uploads/attach/2019/07/16/5d2ca4f919c70.jpg"
        } */
      ],
      subitemTitle: '数码产品',
      bannerImg: [
        { id: 1, url: require("../../assets/images/banner1.jpg")},
        { id: 2, url: require("../../assets/images/banner2.png") },
        { id: 3, url: require("../../assets/images/banner1.jpg") }
      ],
      isActive: false,
      currentIndex: 0,
    };
  },
  created(){
    this.getCategory();
  },
  methods: {
    getCategory(){
      // 获取物品的分类
      this.$axios.get('/api/get_product_category.json')
        .then(res => {
          this.taglist = Object.assign(res.data.data);
          this.taglist.forEach(item => {
            this.subitemList.push(item.child);
          })
        })
    },
    enter(index){
      this.currentIndex = index;
      this.isActive = true;
      this.subitemTitle = this.taglist[index].cate_name;
    },
    leave(){
      this.isActive = false;
      this.subitemTitle = '';
    }
  }
};
</script>

<style lang="scss" scoped>
$fontColor: #2d8cf0;
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.banner-container {
  width: 1200px;
  margin: 30px auto;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 6px 15px 0 rgba(7, 17, 27, 0.1);
}
.menuContent {
  position: relative;
  float: left;
  width: 180px;
  height: 440px;
  z-index: 2;
  box-sizing: border-box;
  background: #2b333b;
  border-bottom-left-radius: 4px;
  font-weight: 400;
  padding-top: 10px;
  overflow-y: auto;
}
.menuContent::-webkit-scrollbar {
  display: none;
}
.menuContent .item.menuActive,
.menuContent .item:hover {
  background: hsla(0, 0%, 100%, 0.3);
  color: #fff;
}
.menuContent .item {
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  cursor: pointer;
  padding-left: 14px;
}
.menuContent .item > a {
  display: block;
  color: hsla(0, 0%, 100%, 0.6);
  padding: 0 16px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 50px;
  transition: all 0.1s;
}
.menuContent .item > a:hover {
  outline: 0;
  text-decoration: none;
}
.menuContent .item > a i {
  position: absolute;
  right: 8px;
  top: 17px;
  color: hsla(0, 0%, 100%, 0.5);
  font-size: 16px;
}
.sub-menu {
  box-sizing: border-box;
  position: absolute;
  max-width: 100%;
  left: 180px;
  top: 0;
  height: 440px;
  padding: 20px;
  width: 700px;
  z-index: 10;
  background-color: #fff;
  overflow-y: auto;
  display: none;
}
.sub-menu.active{
  display: block;
}
.sub-menu .divider {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #e8eaec;
  margin: 16px 0;
}
.sub-menu .divider span {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  padding: 0 24px;
  background: #fff;
  font-weight: 500;
  color: #17233d;
  font-size: 16px;
}
.sub-menu .sub-item .item {
  width: 75px;
  margin-right: 25px;
  margin-bottom: 10px;
  transition: all 0.2s;
  text-align: center;
  cursor: pointer;
}
.sub-menu .sub-item .item:hover {
  color: $fontColor;
}
.sub-menu .sub-item img {
  width: 75px;
}


</style>
