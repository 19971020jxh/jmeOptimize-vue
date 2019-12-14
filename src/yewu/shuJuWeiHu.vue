<template>
<!--    数据维护页面-->
  <div >
    <div style="width: 75%;margin: 0 auto">
    <el-row>
      <el-col :span="18">
        <h3 style="margin-left: 15px">分组数据</h3>
        <el-form :inline="true" :model="nowSelect"  style="margin-left: 45px">
          <el-form-item v-if="false" >
            <el-input   v-model.number="nowSelect.id"  ></el-input>
          </el-form-item>
          <el-form-item v-if="false" >
            <el-input   v-model.number="nowSelect.jiqi"  ></el-input>
          </el-form-item>
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
        <h3 style="margin-left: 15px"> 全部数据</h3>
        <el-table
          :data="data"
          ref="table"
          border
          style="width: 100%"
          :max-height="rowHeight*8"
          stripe
          highlight-current-row
          @current-change="rowClick"
        >
          <el-table-column
            prop="id"
            v-if="false" >
          </el-table-column>
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
        <el-button @click="nextRow" >上一条</el-button>
        <el-button @click="lastRow" >下一条</el-button>
      </el-col>

      <el-col :span="5" style="margin-left: 15px;margin-top: 15px;">
        <el-card class="box-card">
          <el-radio-group v-model="jiqi"   size="mini"   @change="getData(jiqi)" style="margin-left: 15px;">
            <el-radio :label="item" v-for=" item in JiQis" :key="item" style="margin:15px;">{{item+'号机组'}}</el-radio><br/>
          </el-radio-group>
        </el-card>
        <el-card class="box-card" style="margin-top: 15px;text-align: center">
          <el-button  @click="add" size="medium" :type="addColor" style="margin-bottom: 5px;">{{addName}}</el-button><br/>
          <el-button  @click="update" size="medium" :type="updateColor" style="margin-bottom: 5px;">{{updateName}}</el-button><br/>
          <el-button  @click="Jdelete" size="medium" :type="deleteColor" style="margin-bottom: 5px;">{{deleteName}}</el-button><br/>
          <el-button  @click="()=>{this.init();this.$message('刷新成功!');}" size="medium" type="warning" style="margin-bottom: 5px;">刷新</el-button><br/>
        </el-card>
      </el-col>
    </el-row>
    </div>



  </div>
</template>

<script>
    export default {
      name: "shuJuWeiHu",
      data(){
          return {
            nowSelect:{},
            JiQis:[],
            data:[],
            jiqi:"",
            rowHeight:40,
            addNumber:0,
            addName:'新增',
            addColor:'primary',
            updateName:'修改',
            updateColor:'success',
            deleteColor:'info',
            deleteName:'删除',
          }
      },
      created(){
      this.init();
      },
      methods:{
        init(){
         this.jiQis();
        },
        Jdelete(){
          this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getDelete();
          })
        },
        getDelete(){
          this.$axios({
            method:'get',
            url:'/getDelete',
            params:this.nowSelect,
          }).then(response=>{
            this.$message('删除成功');
            this.data.splice(this.data.indexOf(this.nowSelect),1);
            this.nowSelect={};
          })
        },
        update(){
          if(this.validate()){
            return;
          }
          this.getUpdate();
        },
        getUpdate(){
          this.$axios({
            method:'get',
            url:'/getUpdate',
            params:this.nowSelect,
          }).then(response=>{
            this.$message('修改成功');
            this.data[this.data.indexOf(response.data.old)]=this.nowSelect;
          });
        },
        add(){
          if(this.addNumber==0){
            this.nowSelect={};
            this.addName='确定'
            this.addColor='danger'
            this.addNumber=1;
            document.getElementById('oneInput').getElementsByTagName("input")[0].focus();
          }else{
            if(this.validate()){
              return;
            }
            this.getAdd();
            this.addNumber=0;
          }
        },
        jiQis(){
          this.$axios({
            method:'get',
            url:'/getjiQis',
          }).then(response=>{
            this.JiQis=response.data.jiQis;
            this.getData(this.JiQis[0]);
          });
        },
        validate(){
          console.log('this.nowSelect.chuli '+this.nowSelect.chuli)
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
        getAdd(){
          this.nowSelect.jiqi=this.jiqi;
          console.log(this.nowSelect)
          this.$axios({
            method:'get',
            url:'/addData',
            params: this.nowSelect,
          }).then(response=>{
            this.$message('添加成功!');
            this.getData(this.jiqi);
            this.addColor='primary';
            this.addName='新增';
            this.nowSelect={};
            this.$refs.table.bodyWrapper.scrollTop=this.$refs.table.bodyWrapper.scrollHeight;
          })
        },
        getData(jiqi){
          this.$axios({
            method:'get',
            url:'/getData_shuJuWeiHu',
            params:{
              jiqi:jiqi
            }
          }).then(response=>{
            this.jiqi=jiqi;
            this.data=response.data.data;
            this.$refs.table.bodyWrapper.scrollTop=0;
            this.nowSelect={};
            setTimeout(()=>{
              this.rowHeight=document.getElementsByClassName('el-table__row')[0].clientHeight+0.2;
            },500)
          });
        },
        rowClick(row){
          this.nowSelect=row;
          this.rowHeight=document.getElementsByClassName('el-table__row')[0].clientHeight+0.2;
        },
        nextRow(){
          this.$refs.table.setCurrentRow(this.data[this.data.indexOf(this.nowSelect)-1]);
          let h=this.$refs.table.bodyWrapper.scrollTop;
          if((h/this.rowHeight)>this.data.indexOf(this.nowSelect)-1){
            this.$refs.table.bodyWrapper.scrollTop=h-((h/this.rowHeight)-this.data.indexOf(this.nowSelect)+1)*this.rowHeight;
          }
        },
        lastRow(){
          this.$refs.table.setCurrentRow(this.data[this.data.indexOf(this.nowSelect)+1]);
          let h=this.$refs.table.bodyWrapper.scrollTop;
          if((h/this.rowHeight)+6<this.data.indexOf(this.nowSelect)+1  ){
            this.$refs.table.bodyWrapper.scrollTop=h+(this.data.indexOf(this.nowSelect)-1-(h/this.rowHeight)-5)*this.rowHeight;
          }
        },
      }
    }
</script>

<style scoped>

</style>
