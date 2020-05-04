<template>
  <div class="content-container">
    <div class="content-box" v-show="name === 'user_info' " style="padding-left: 30px;">
      <el-form label-width="80px" :model="formLabelAlign" :disabled="disabled">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <el-avatar v-if="imageUrl" :src="imageUrl" class="avatar" :size="50"></el-avatar>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="formLabelAlign.school"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
      </el-form>
      <div class="function-buttons">
        <el-button type="warning" @click="alter">修改</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <div class="content-box" v-show="name === 'my_order' ">
      <h3 class="title">交易订单</h3>
      <div class="order-box" v-if="value">
        <el-table :data="tableData" border style="width: 100%;margin-left: 20px;margin-top: 10px;">
          <el-table-column prop="imageUrl" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl" alt style="width: 120px;" />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="no-content" v-else>暂无订单</div>
    </div>
    <div class="content-box" v-show="name === 'my_publish' ">
      <h3 class="title">我的发布</h3>
      <div class="order-box" v-if="value1">
        <el-table :data="tableData1" border style="width: 100%;margin-left: 20px;margin-top: 10px;">
          <el-table-column prop="imageUrl" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl" alt style="width: 120px;" />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="no-content" v-else>暂无已发布物品</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    name: {
      type: String,
      required: true,
      default: "user_info"
    }
  },
  components: {},
  data() {
    return {
      formLabelAlign: {
        name: "",
        school: "",
        address: ""
      },
      imageUrl: "https://api.youzixy.com/public/uploads/avatar/default3.png",
      disabled: true,
      value: true,
      value1: false,
      tableData: [
        {
          imageUrl:
            "https://api.youzixy.com/public/uploads/attach/2020/01/09/5e167752ca073.jpg",
          status: "未发货",
          price: "￥89.0",
          date: "2020-02-02"
        }
      ],
      tableData1: [
        {
          imageUrl:
            "https://api.youzixy.com/public/uploads/attach/2020/01/09/5e167752ca073.jpg",
          status: "未交易",
          price: "￥89.0",
          date: "2020-02-02"
        }
      ]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    alter() {
      this.disabled = false;
    },
    save() {
      alert("正在处理中");
      this.disabled = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      alert("删除");
      console.log(index, row);
    }
  }
};
</script>


<style lang="scss" scoped>
.content-box {
  min-height: 600px;
  width: 760px;
  .el-form {
    margin-top: 40px;
    .el-input {
      width: 250px;
    }
  }
  .function-buttons {
    margin-left: 80px;
  }

  .title {
    line-height: 32px;
    color: #999;
    padding-left: 20px;
    margin: 5px 0;
  }
  .no-content {
    text-align: center;
    color: #c5c8ce;
    font-size: 18px;
  }
}
</style>