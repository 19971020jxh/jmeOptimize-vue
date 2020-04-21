<template>
  <div style="margin-top: 45px;margin-left: 15%;">
<!--  old version 4/8   -->
<!--   <div style="margin-top: 20px;margin-left: 145px;display: inline-block">机组效率曲线</div>-->
<!--   <el-radio-group v-model="jiqi"   size="mini"   @change="getData(jiqi)" style="margin-left: 15px;">-->
<!--    <el-radio-button :label="item" v-for=" item in JiQis" :key="item" >{{item+'号机组'}}</el-radio-button>-->
<!--  </el-radio-group>-->
<!--  <div id="myChart" :style="{width: width+'px', height: heigth+'px'}"></div>-->
<!--  old version 4/8   -->
     <h4>查看效率曲线</h4>
    <el-radio v-model="jiqi" label="1">机器1</el-radio>
    <el-radio v-model="jiqi" label="2">机器2</el-radio>
    <el-radio v-model="jiqi" label="31">机器3大齿轮</el-radio>
    <el-radio v-model="jiqi" label="32">机器3小齿轮</el-radio>
    <br/><br/><br/>
    <el-button @click="quXian" type="primary">确定</el-button>
  </div>
</template>

<script>

    export default {
      name: "xiaoLvQuXian",
      data() {
        return {
        jiqi:'1',
        JiQis:[],
        data:[],
        width:'',
        heigth:'',
        }
      },
      mounted(){
        this.width=document.documentElement.clientWidth*0.95;
        this.heigth=window.screen.availHeight-150;
        this.init();
      },

      created(){

      },
      methods: {
        init(){
          // 特征曲线窗口
          this.curve();

         // old version 4/8
        //  this.JiQis=[1,2];
        //  this.getData(1);
        },
        quXian(){
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios({
             method:'get',
             url:'curve',
             params: {'jiqi':this.jiqi},
          }).then(response=>{
            loading.close();
          })
        },
        curve(){
          this.$axios({method:'get',url:'curve'});
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
              // if(arry.length==2){
              //   this.data.push({
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
          //  console.log(this.data)
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
            series:this.data


          },true);
        },
      },
    }
</script>

<style scoped>

</style>
