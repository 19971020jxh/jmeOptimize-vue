<template>
  <div id="youhua">

    <el-row  >
      <el-col :span="18">
        <el-card class="box-card" v-for="(item,index) in JiQis" :key="item" style="margin-bottom:5px;"   >
          <div slot="header" class="clearfix">
            <span>{{item+'号机器'}}</span>
          </div>
          <div>
            <el-form :inline="true" :model="list[index]"  >
              <el-form-item label="开/停">
                <el-radio-group v-model="list[index].zhuangTai">
                  <el-radio :label="1">开</el-radio>
                  <el-radio :label="0">停</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="流量(立方米/秒)">
                <el-select v-model="list[index].value"  >
                  <el-option label="满载" value="1"></el-option>
                  <el-option label="任意" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card"  style="margin-top:15px;" >
          <div slot="header" class="clearfix">
            <span> 单机运行计算结果</span>
          </div>
          <el-table
            :data="danJi"
            style="width: 100%">
            <el-table-column
              prop="bianHao"
              label="机组编号"
            >
            </el-table-column>
            <el-table-column
              prop="shuitou"
              label="运行水头"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fuHe"
              label="机组负荷">
            </el-table-column>
            <el-table-column
              prop="liuLiang"
              label="机组流量">
            </el-table-column>
          </el-table>
          <div>
          </div>
        </el-card>
        <el-card class="box-card"  style="margin-top:15px;">
          <div slot="header" class="clearfix">
            <span> {{tableLabel}}</span>
          </div>
          <el-table
            :data="duoJi"
            show-summary
            style="width: 100%">
            <el-table-column
              prop="bianHao"
              label="机组编号"
            >
            </el-table-column>
            <el-table-column
              prop="shuitou"
              label="运行水头"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fuHe"
              label="机组负荷">
            </el-table-column>
            <el-table-column
              prop="liuLiang"
              label="机组流量">
            </el-table-column>
          </el-table>
          <div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="margin-top: 45px;" >
        <div style="margin:5px;">

          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="流量取值范围">
              <el-input   style="width:180px;" v-model="fanWei" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="总流量(立方米/秒)">
              <el-input   style="width:180px;"   v-model="form.liuLiang"></el-input>
            </el-form-item>
            <el-form-item label="上游水位">
              <el-input-number v-model="form.shangYou" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="下游水位">
              <el-input-number v-model="form.xiaYou" :step="1"></el-input-number>
            </el-form-item>
          </el-form>

          <div style=" margin-left:15px;margin-right: 15px;margin-top: 25px;">
            <el-button type="primary">优化</el-button>
            <el-button type="success" @click="showGongKuang" >显示工况</el-button>
            <br/>
            <el-button type="info" style="margin-top:5px;" @click="$printJS({printable:'printDiv',type:'html' , scanStyles:false,targetStyles:['display','border','text','margin','width']  })" >打印</el-button>
            <el-button type="warning" style="margin-top:5px;" @click="lastBtn" >{{lastBtnValue}}</el-button>
          </div>

        </div>
      </el-col>
    </el-row>

<!--#&#45;&#45;&#45;&#45;&#45;&#45;打印-&#45;&#45;&#45;&#45;   -->
 <div id="printDiv" style="height:0px;overflow-y: hidden;" >
        <div style="text-align: center;margin-top: 45px;">
          <h3>水轮机组经济运行智能系统</h3>
          <h4>优化结果</h4>
        </div>
        <div style="width:100%; ">
          <div style="width: 200px;display: inline-block;margin-left: 12.5%;" >
            日期:{{JdateTime}}
          </div>
          <div style="width: 200px;display: inline-block;margin-left: 12.5%;" >
            部门:产品研发部
          </div>
          <div style="width: 200px;display: inline-block;margin-left: 12.5%;" >
            级别
          </div>
          <div style="margin-left: 12.5%;margin-top: 5px;">
            运行条件<br/>
            <div v-for=" item  in JiQis" :key="item" style="margin-top: 5px;">{{item+'号机组:不限制'}}</div>
          </div>
          <div style="width: 75%;" >
            <el-table
              :data="danJi"
              border
              style="width: 100%">
              <el-table-column
                prop="bianHao"
                label="机组编号"
              >
              </el-table-column>
              <el-table-column
                prop="shuitou"
                label="运行水头"
                width="180">
              </el-table-column>
              <el-table-column
                prop="fuHe"
                label="机组负荷">
              </el-table-column>
              <el-table-column
                prop="liuLiang"
                label="机组流量">
              </el-table-column>
            </el-table>
          </div>

        </div>
      </div>

    <el-dialog
    title="工况"
    :visible.sync="gongKuangDiaLog"
    >
      <el-table
        :data="duoJi"
        style="width: 100%">
        <el-table-column
          prop="bianHao"
          label="机组编号"
        >
        </el-table-column>
        <el-table-column
          prop="shuitou"
          label="运行水头"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fuHe"
          label="机组负荷">
        </el-table-column>
        <el-table-column
          prop="liuLiang"
          label="机组流量">
        </el-table-column>
      </el-table>
      <xiao-lv-qu-xian></xiao-lv-qu-xian>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="gongKuangDiaLog = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

    import xiaoLvQuXian from '@/yewu/xiaoLvQuXian'
    export default {
        name: "youHua",
        components:{
              xiaoLvQuXian
        },
       data(){
          return{
            JiQis:[],
            list:[],
            danJi:[],
            duoJi:[],
            fanWei:'',
            form:{
              liuLiang: '',
              shangYou:'',
              xiaYou:'',
            },
            lastBtnValue:'等流量分配计算',
            tableLabel:'多机运行计算结果',
            JdateTime:'',
            gongKuangDiaLog:false,
          }
       },

      created() {
          this.init();
      },
      methods:{
        init(){
          this.jiQis();
          this.dateTime();
        },
        showGongKuang(){
        this.gongKuangDiaLog=true;
        },
        jiQis(){
          this.$axios({
            method:'get',
            url:'/getjiQis',
          }).then(response=>{
            this.JiQis=response.data.jiQis;
            this.JiQis.forEach(e=>{
            this.list.push({zhuangTai:'1',value:'0'});
            })
          });
        },
        lastBtn(){
          if(this.lastBtnValue=='等流量分配计算'){
            this.lastBtnValue='显示优化结果'
            this.tableLabel='等流量分配计算结果'
          }else{
            this.lastBtnValue='等流量分配计算'
            this.tableLabel='优化结果'
          }

        },
        dateTime(){
           let aData = new Date();
           this.JdateTime=  aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
        },
      },
    }
</script>

<style scoped>
#youhua .el-dialog{
  width: 95%;
  margin: 0 auto;
}
</style>
