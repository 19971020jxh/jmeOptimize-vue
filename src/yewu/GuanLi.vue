<template>
  <div style="margin-top: 15px;">

    <el-tabs v-model="tab" style="width: 75%;margin-left: 12.5%;">
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
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            v-if="false" >
          </el-table-column>
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
        <div style="margin-top: 15px;">
          <el-button @click="dialogAddUser=true">新增用户</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="机器管理" name="second">
        <h4>当前机器:</h4>
        <el-tag
          v-for="item in JiQis"
          :key="item"
          closable
          @close="deletJiQi(item)"
          style="margin-right: 15px;"
        >
          {{item+'号机器'}}
        </el-tag>
        <h4>新增机器:</h4>
        <el-button type="primary" @click="showJiQiAdd=true" >新增机器</el-button>
      </el-tab-pane>
      <el-tab-pane label="数据管理" name="three">
        <el-tooltip class="item" effect="dark" content="该操作会清空全部机器数据!" placement="right">
        <el-button type="danger"
        @click="()=>{  $confirm('此操作将永久删除机器数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  $axios({
                  method:'post',
                  url:'/deleteAll',
                  }).then(response=>{
                   this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  });
                }) }"
                   plain>清空数据</el-button>
        </el-tooltip>
      </el-tab-pane>
    </el-tabs>



    <el-dialog  title="新增账号" :visible.sync="dialogAddUser" width="315px" >
      <el-form :inline="true" :model="newUser">
        <el-form-item label="账号"  >
          <el-input v-model="newUser.name" style="width: 222px;" ></el-input>
        </el-form-item>
        <el-form-item label="角色"  >
          <el-select v-model="newUser.role" >
            <el-option label="用户" value="用户"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog  title="新增机器" :visible.sync="showJiQiAdd" >
      <p>您正在给<strong>{{JiQis[JiQis.length-1]+1}}</strong>号新机器添加数据</p>
      <el-table
        :data="newJiQi"
        border
        style="width: 100%;"
        stripe
        highlight-current-row
      >
        <el-table-column
          prop="shuitou"
          label="水头"
          width="180">
        </el-table-column>
        <el-table-column
          prop="chuli"
          label="出力"
          width="180">
        </el-table-column>
        <el-table-column
          prop="liuLiang"
          label="流量">
        </el-table-column>
      </el-table>
      <el-form :inline="true" :model="nowSelect"  style="margin-top: 45px">
        <el-form-item label="水头">
          <el-input-number id="oneInput" v-model="nowSelect.shuitou" type="number" :step="1"  ></el-input-number>
        </el-form-item>
        <el-form-item label="出力">
          <el-input-number v-model="nowSelect.chuli" type="number" :step="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="流量">
          <el-input-number v-model="nowSelect.liuLiang" type="number" :step="1" ></el-input-number>
        </el-form-item>
      </el-form>
      <el-button type="warning" @click="add()" >添加数据</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="()=>{
         showJiQiAdd=false;
         newJiQi=[];
         }">取 消</el-button>
        <el-button type="primary" @click="toAdd">确定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    export default {
        name: "GuanLi",
      data(){
          return{
            tab:"first",
            nowSelect:{},
            newJiQi:[],
            user:{
              id:'',
              name:'',
              password:'',
              role:'',
            },
            userList:[],
            JiQis:[],
            dialogAddUser:false,
            newUser:{
              name:"",
              role:"用户",
            },
            showJiQiAdd:false,
          }
      },
      created(){
         this.init();
      },
      methods:{
         init(){
           this.$axios({
             method:'get',
             url:"/user/init",
           }).then(response=>{
             this.userList=response.data.userList;
           });
           this.jiQis();
           this.user=sessionStorage.getItem("user");
         },
        toAdd(){
           this.$axios({
             method:'post',
             url:'/newJiQi',
             data:this.newJiQi,
           }).then(response=>{
             this.init();
             this.$message({
               type: 'success',
               message: '添加成功!'
             });
             this.showJiQiAdd=false;
           });
        },
        add(){
          if(this.validate()){return;}
          else{
            this.newJiQi.push({
            jiqi:this.JiQis[this.JiQis.length-1]+1,
            shuitou:this.nowSelect.shuitou,
            chuli:this.nowSelect.chuli,
            liuLiang:this.nowSelect.liuLiang,
          }) ;this.nowSelect={}
          }
        },
        deletJiQi(item){
          this.$confirm('此操作将永久删除'+item+'号机器, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        },
        jiQis(){
          this.$axios({
            method:'get',
            url:'/getjiQis',
          }).then(response=>{
            this.JiQis=response.data.jiQis;
          });
        },
        updateUser(){
           this.$axios({
             method:'get',
             url:"/user/update",
             params:this.user,
           }).then(response=>{
             this.user=response.data.user;
             this.$message({
               message: '修改成功!',
               type: 'success'
             });
           });
        },
        addUser(){
           console.log(this.newUser)
          this.$axios({
            method:'get',
            url:"/user/add",
            params:this.newUser,
          }).then(response=>{
            if(response.data.status=='账号已存在!'){
              this.$message({
                message: '账号已存在!',
                type: 'waning'
              });
              return;
            }
            this.$message({
              message: '添加成功!',
              type: 'success'
            });
            this.dialogAddUser=false;
            this.init();
          });
        },
        DeleteUser(row){
           console.log(row)
          this.$axios({
            method:'get',
            url:"/user/delete",
            params:{id:row.id},
          }).then(response=>{
            this.init();
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
          });
        },
        validate(){
        //  console.log('this.nowSelect.chuli '+this.nowSelect.chuli)
          if (this.nowSelect.shuitou ==undefined && this.nowSelect.chuli ==undefined && this.nowSelect.liuLiang ==undefined){
            this.$message('必须有一个不为空!'); return true;
          }
          if((!/^[0-9.]*$/.test(this.nowSelect.shuitou)&& this.nowSelect.shuitou !=undefined)  ||
            (!/^[0-9.]*$/.test(this.nowSelect.chuli) && this.nowSelect.chuli!=undefined) ||
            (!/^[0-9.]*$/.test(this.nowSelect.liuLiang)&& this.nowSelect.liuLiang!=undefined )){
            this.$message('输入不合法!');return true;
          }

          return  false;
        },
      }
    }
</script>

<style scoped>

</style>
