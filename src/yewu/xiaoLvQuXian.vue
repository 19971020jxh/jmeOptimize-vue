<template>
  <div>
   <div style="margin-top: 20px;margin-left: 145px;display: inline-block">机组效率曲线</div>
   <el-radio-group v-model="jiqi"   size="mini"   @change="getData(jiqi)" style="margin-left: 15px;">
    <el-radio-button :label="item" v-for=" item in JiQis" :key="item" >{{item+'号机组'}}</el-radio-button>
  </el-radio-group>
  <div id="myChart" :style="{width: width+'px', height: heigth+'px'}"></div>
  </div>
</template>

<script>

    export default {
      name: "xiaoLvQuXian",
      data() {
        return {
        jiqi:'',
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
          this.jiQis();
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
              let arry=new Array();arry.push(0);
              for(let i=0;i<value.length-1;i++){
                if(value[i][1]-value[i+1][1]>0){
                  arry.push(i+1);
                }
              }
              arry.push(value.length-1)
              if(arry.length==2){this.data.push({
                id: key,
                type: 'line',
                smooth: true,
                data: value
              });}
              else{
                for(let i=0;i<arry.length-1;i++){
                  let v=value.slice(arry[i],arry[i+1]);
                  this.data.push({
                    id: key+'-'+Number(i)+Number(1),
                    type: 'line',
                    smooth: true,
                    data: v
                  });
                }
              }

            }
            console.log(this.data)
            this.drawLine();
          });
        },
        drawLine() {

          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            // title: {
            //   text: '机组效率曲线'
            // },
            tooltip: {
              formatter: function (params) {
                var data = params.data || [0, 0];
                return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
              }
            },
            // grid: {
            //   left: '3%',
            //   right: '4%',
            //   bottom: '3%',
            //   containLabel: true
            // },
            xAxis: {
              type: 'value',
              axisLine: {onZero: false},
              min:9,
              maxInterval:1
            },
            yAxis: {

              type: 'value',
              axisLine: {onZero: true},
              min:73,
            },
            series: this.data

          });
        },
      },
    }
</script>

<style scoped>

</style>
