<template>
  <div>
    <div style="margin-top: 20px;margin-left: 145px;display: inline-block">机组</div>
    <!--                    @change="getData(jiqi)" -->
    <el-radio-group v-model="jiqi"   size="mini"

                    style="margin-left: 15px;">
      <el-radio-button :label="1" :key="1" >{{'1号机组'}}</el-radio-button>
      <el-radio-button :label="2" :key="2" >{{'2号机组'}}</el-radio-button>
      <el-radio-button :label="31" :key="31" >{{'3号机组大齿轮'}}</el-radio-button>
      <el-radio-button :label="32" :key="32" >{{'3号机组小齿轮'}}</el-radio-button>
    </el-radio-group>

    <el-button type="primary" size="small" @click="chuLi">确定</el-button>

<!--    <el-row>-->
<!--      <el-col :span="20">-->
<!--        <div id="myChart" :style="{width: width+'px', height: heigth+'px'}"></div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div style=" margin-top: 55px;margin-left: 15px;">-->
<!--          <el-form :inline="true" :model="nowSelect"  >-->
<!--            <el-form-item label="工作水头">-->
<!--              <el-input-number v-model="nowSelect.shuitou" :step="1" ></el-input-number>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="引用流量">-->
<!--              <el-input-number v-model="nowSelect.liuLiang" :step="1" ></el-input-number>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="机组出力">-->
<!--              <el-input v-model="nowSelect.chuli"  ></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button type="primary" @click="chaXun">确定</el-button>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button type="warning" @click="showGongKuang">显示工况</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->



  </div>
</template>

<script>
    export default {
        name: "gongLvJiSuan",
      data() {
        return {
          jiqi:1,
          JiQis:[],
          data:[],
          width:'',
          heigth:'',
          nowSelect:{
            shuitou:'',
            liuLiang:'',
            chuli:''
          }
        }
      },
      mounted(){
        this.width=document.documentElement.clientWidth*0.80;
        this.heigth=window.screen.availHeight-150;
        this.init();
      },
      created(){

      },
      methods: {
        init(){
          this.chuLi();
          // this.jiQis();
        },
        chuLi(){
          this.$axios({method:'get',url:'chuLi',params:{'jiqi':this.jiqi}});
        },
        showGongKuang(){
          // ->显示工况
          if(this.data[this.data.length-1].id=="工况"){
            this.data.splice(this.data.length-1,1);
          }
          this.data.push({
            data:[[this.nowSelect.liuLiang,this.nowSelect.shuitou]],
            id:'工况',
            smooth:"true",
            type:'line',
            symbol:'diamond',
            symbolSize:10,
            itemStyle: {
              normal: {
                color: "#FF0000",
              }
            }
          });
          this.drawLine();
        },
        chaXun(){
          // ->查询是否符合范围.
          if(/^[0-9.]*$/.test(this.nowSelect.shuitou) || /^[0-9.]*$/.test(this.nowSelect.liuLiang) ){
            this.$message('输入不合法!');return;
          }
          this.$axios({
            method:'get',
            url:'isOut',
            params: this.nowSelect
          }).then(response=>{
             if(response.data.isOut.shuitouInfo=="true"){
               this.$message('工作水头输入不合法!');return;
             }
            if(response.data.isOut.liuLiangInfo=="true"){
              this.$message('引用流量输入不合法!');return;
            }
            // -> 显示 机组出力

            // -> 显示 机组出力
          });
        },

        jiQis(){
          this.JiQis=[1,2];
          this.getData(1);
          // this.$axios({
          //   method:'get',
          //   url:'/getjiQis',
          // }).then(response=>{
          //   this.JiQis=response.data.jiQis;
          //   this.getData(this.JiQis[0]);
          //
          // });
        },
        getData(jiqi){
          this.$axios({
            method:'get',
            url:'/getData',
            params:{
              jiqi:jiqi
            }
          }).then(response=>{
            this.data=[];
            this.jiqi=jiqi;
            for(let key in response.data.data){
              let value=response.data.data[key].map(e=>e.xiaoLvQuXian.map(ss=>parseFloat(ss)));
              // -new
              this.data.push({
                id: key,
                type: 'line',
                smooth: true,// 曲线
                symbol:'diamond',// 点样式
                data: value
              });
              //-new
              // let arry=new Array();arry.push(0);
              // for(let i=0;i<value.length-1;i++){
              //   if(value[i][1]-value[i+1][1]>0){
              //     arry.push(i+1);
              //   }
              // }
              // arry.push(value.length-1)
              // if(arry.length==2){this.data.push({
              //   id: key,
              //   type: 'line',
              //   smooth: true,
              //   data: value
              // });}
              // else{
              //   for(let i=0;i<arry.length-1;i++){
              //     let v=value.slice(arry[i],arry[i+1]);
              //     this.data.push({
              //       id: key+'-'+Number(i)+Number(1),
              //       type: 'line',
              //       smooth: true,
              //       data: v
              //     });
              //   }
              // }
            }

            this.drawLine();
          });
        },
        drawLine() {


          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            tooltip: {
              formatter: function (params) {
                let xiaoLv=params.seriesId//.substring(0,params.seriesId.indexOf('-'))
                let data = params.data || [0, 0];
                return '效率:'+xiaoLv+' <br/>出力:'+ data[0].toFixed(2) + ' <br/>水头:' + data[1].toFixed(2);
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              name:'出力',
              axisLine: {onZero: false},
              min:0,
              // maxInterval:1000
            },
            yAxis: {
              type: 'value',
              name:'水头',
              axisLine: {onZero: true},
              min:0,
            },
            dataZoom:
              [
                {
                  id:'x_dataZoom',
                  type:'slider',
                  xAxisIndex:0,
                  start:0,
                  end:102
                },
                {
                  id:'y_dataZoom',
                  type:'slider',
                  yAxisIndex:0,
                  orient:'vertical',
                  start:0,
                  end:102
                },
              ],
            series: this.data

          },true);
        },
      },
    }
</script>

<style scoped>

</style>
