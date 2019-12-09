<template>
<!--    数据维护页面-->
  <div >
    <div style="width: 75%;margin: 0 auto">
    <el-row>
      <el-col :span="18">
        <h3 style="margin-left: 15px">分组数据</h3>
        <el-form :inline="true" :model="nowSelect"  style="margin-left: 45px">
          <el-form-item label="水头">
            <el-input v-model="nowSelect.shuitou"  ></el-input>
          </el-form-item>
          <el-form-item label="出力">
            <el-input v-model="nowSelect.chuli"  ></el-input>
          </el-form-item>
          <el-form-item label="流量">
            <el-input v-model="nowSelect.liuLiang"  ></el-input>
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
          <el-button  size="medium" type="primary" style="margin-bottom: 5px;">新增</el-button><br/>
          <el-button  size="medium" type="success" style="margin-bottom: 5px;">修改</el-button><br/>
          <el-button  size="medium" type="info" style="margin-bottom: 5px;">删除</el-button><br/>
          <el-button  size="medium" type="warning" style="margin-bottom: 5px;">刷新</el-button><br/>
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
            rowHeight:40
          }
      },
      created(){
      this.init();
      },
      methods:{
        init(){
         this.jiQis();
         this.rowHeight=document.getElementsByClassName('el-table__row')[0].clientHeight+0.2;
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
          });
        },
        rowClick(row){
          this.nowSelect=row;
        },
        nextRow(){
          this.$refs.table.setCurrentRow(this.data[this.data.indexOf(this.nowSelect)-1]);
          let h=this.$refs.table.bodyWrapper.scrollTop;
          if((h/this.rowHeight)>this.data.indexOf(this.nowSelect)-1  ){
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
