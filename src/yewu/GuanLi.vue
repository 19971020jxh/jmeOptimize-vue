<template>
  <div style="margin-top: 15px;">

    <el-tabs style="width: 75%;margin-left: 12.5%;">
      <el-tab-pane label="账号管理" name="first">
        <el-form :inline="true" :model="user" class="demo-form-inline">
          <el-form-item label="修改密码">
            <el-input v-model="user.password"  type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser">提交</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="userList"
          style="width: 100%">
          <el-table-column
            label="账号"
            >
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            label="角色"
            >
            <template slot-scope="scope">
              {{scope.row.role}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="DeleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-button @click="newUseShow">新增用户</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="机器管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="数据管理" name="three">配置管理</el-tab-pane>
    </el-tabs>


  </div>

</template>

<script>
    export default {
        name: "GuanLi",
      data(){
          return{
            user:{
              id:'',
              name:'',
              password:'',
              role:'',
            },
            userList:[],

          }
      },
      methods:{
        updateUser(){

        },
        newUseShow(){

        },
        DeleteUser(row){

        },
      }
    }
</script>

<style scoped>

</style>
