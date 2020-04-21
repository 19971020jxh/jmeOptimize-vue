<template>
    <div style="width: 75%;margin: 15px auto;">
      <el-row :gutter="20">
        <el-col :span="19">
          <label >训练样本文件</label><br/>
          <div  style="margin: 5px;">
            <small >文件目录： {{this.filePath}}</small><br/>
          </div>
          <input type="file"  @change="importf" />

<!--          <el-upload-->
<!--            action="1000"-->
<!--            :before-upload="beforeUpload"-->
<!--            :auto-upload="false"-->
<!--            ref="upload"-->
<!--            :on-change="importf"-->
<!--           >-->
<!--            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--          </el-upload>-->


<!--          <el-upload-->
<!--            :action="1000"-->
<!--            :before-upload="beforeUpload"-->
<!--            accept="xlsx,xls"-->
<!--            id="file"-->
<!--          >-->
<!--              <el-button size="small" type="primary">上传excel</el-button>-->
<!--          </el-upload>-->

          <el-form :inline="true" :model="form" style="margin-top: 15px;">
            <el-form-item label="隐层神经元数">
              <el-input-number v-model="form.yuanShu"   ></el-input-number>
            </el-form-item>
            <el-form-item label="学习率">
              <el-input-number v-model="form.xueXi"   ></el-input-number>
            </el-form-item>
            <el-form-item label="网络精度值">
              <el-input-number v-model="form.jingDu"   ></el-input-number>
            </el-form-item>
            <el-form-item label="最大学习次数">
              <el-input-number v-model="form.ciShu"   ></el-input-number>
            </el-form-item>
            <el-form-item label="稳定率">
              <el-input-number v-model="form.wenDing"   ></el-input-number>
            </el-form-item>
            <el-form-item label="训练样本数">
              <el-input-number v-model="form.yangBen"   ></el-input-number>
            </el-form-item>
          </el-form>

<!--          // -&#45;&#45; 表格 &#45;&#45;&#45;&#45;-->
          <el-table
            :data="excelData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
          >
            <el-table-column
              v-for="(item,key,index) in excelData[0]"
              :key="index"
              :prop="key"
              :label="key"
              width="180"
            ></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="excelData.length"
          >
          </el-pagination>

<!--          .slice((currentPage-1)*pageSize,currentPage*pageSize)-->
<!--          <div >-->
<!--          <el-table :data="excelData"  >-->
<!--            <el-table-column prop="ID" label="数据组" width="140"></el-table-column>-->
<!--            <el-table-column prop="XiaoLv" label="效率" width="120"></el-table-column>-->
<!--            <el-table-column prop="ShuiTou" label="水头"></el-table-column>-->
<!--            <el-table-column prop="ChuLi" label="出力"></el-table-column>-->
<!--            <el-table-column prop="LiuLiang" label="流量"></el-table-column>-->
<!--          </el-table>-->
<!--          <div>-->
<!--            <el-pagination-->
<!--              @current-change="currentChange"-->
<!--              layout="prev, pager, next"-->
<!--              :page-size="pageSize"-->
<!--              :total="excelData.length">-->
<!--            </el-pagination>-->


<!--          -->
<!--          </div>-->
<!--          </div>-->
<!--          // -&#45;&#45; 表格 &#45;&#45;&#45;&#45;-->

        </el-col>
        <el-col :span="5">
          <el-card class="box-card">
            <el-radio-group v-model="jiqi"   size="mini"     style="margin-left: 15px;">
<!--              <el-radio :label="item" v-for=" item in JiQis" :key="item" style="margin:15px;">{{item+'号机组'}}</el-radio><br/>-->
              <el-radio :label="1"   :key="1" style="margin: 15px;">{{1+'号机组'}}</el-radio><br/>
              <el-radio :label="2"   :key="2" style="margin: 15px;">{{2+'号机组'}}</el-radio><br/>
              <el-radio   :label="31"  :key="31" style="margin: 15px;">{{3+'号机组大水轮'}}</el-radio>
              <el-radio   :label="32"  :key="32" style="margin: 15px;">{{3+'号机组小水轮'}}</el-radio>
            </el-radio-group>
          </el-card>
          <el-card class="box-card" style="margin-top:15px;text-align: center">
            <br/>
            <el-button style="margin-top:5px;margin-left: 10px;" type="primary" @click="data_process()" >数据处理</el-button>
            <el-button style="margin-top:5px;" type="success" @click="niHe()" >拟合学习</el-button>
            <el-button style="margin-top:5px;" type="info" @click="SaveModel()" >保存网络</el-button>
          </el-card>
        </el-col>
      </el-row>


    </div>
</template>

<script>



  import XLSX from 'xlsx'
  import  axios from 'axios'
    export default {
        name: "moXingXunLian",
      data(){
          return{

            currentPage:1,
            pageSize:15,
            tableData:[],
            file:[],
            form:{
              yuanShu:'',
              xueXi:'',
              jingDu:'',
              ciShu:'',
              wenDing:'',
              yangBen:'',
              // ciShu:'',
              // wuCha:'',
              jiqi:'',
              pageName:'',
            },
            JiQis:[],
            jiqi:1,
            form2:{
              ciShu:'',
              wuCha:'',
            },
            filePath:'',
            fileName:'',
            formData:new FormData(),
            excelData:[],
          }
      },
      created(){
        this.init();
      },
      // mounted(){
      //   this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
      //     this.readExcel(e);
      //   })
      // },
      methods:{
        handleSizeChange: function(size) {
          this.pagesize = size;
          console.log(this.pagesize); //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage) {
          this.currentPage = currentPage;
          console.log(this.currentPage); //点击第几页
        },


        currentChange(currentPage){
          this.currentPage = currentPage;
        },


  init(){
         // this.jiQis();
        // -> 出力模型页面 还是 耗流量模型页面.
        this.form.pageName=  this.$route.params.name;
        this.moXingXunLianInit();
        },
        // 页面数据初始化
        moXingXunLianInit(){
          this.$axios({
            method:'get',
            url:"/moXingXunLianInit",
            params:{'pageName':this.form.pageName}
          }).then(respnonse=>{
            this.filePath=respnonse.data.filePath;
          })
        },
        niHe(){
          // -> 检查
            if(this.form.yuanShu<3|| this.form.yuanShu>8){
              this.$message('隐层神经元个数范围在3~8');
              return false;
            }
            if(this.form.xueXi<0.0001|| this.form.xueXi>0.01){
              this.$message('学习率的范围在0.0001~0.01');
              return  false;
            }
            if(this.form.jingDu<0.0001||this.form.jingDu>0.001){
              this.$message('网络精度值的范围在0.0001~0.01');
              return  false;
            }
            if(this.form.yangBen>300){
              this.$message('样本数量不能低于300');
              return  false;
            }
          // -> 检查
          this.form.jiqi=this.jiqi;
          this.$axios({
            method:'post',
            url:'niHe',
            headers:{
              'Content-Type': 'application/json'
            },
            data:{'form':JSON.stringify(this.form)},
          }).then(response=>{
            this.$message('操作成功!')
          })
        },
        SaveModel(){
          this.$axios({
            method:'post',
            url:'SaveModel',
            data:{'jiqi':this.jiqi,'pageName':this.pageName},
          }).then(response=>{
            this.$message('操作成功!')
          })
        },
        data_process(){
            this.$axios({
              method:'post',
              url:'data_process',
              data:this.formData,
            }).then(response=>{
               this.$message('模型重新训练成功!')
            })
        },

       beforeUpload(file){
          // this.$confirm('此操作将清除机器'+this.jiqi+'原有数据', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(()=>{
            this.formData.append('file',file);
            this.formData.append('jiqi',this.jiqi);
            this.formData.append('pageName',this.pageName);
           // axios.post('/addBatch',formData).then((res)=>{
          //  this.$message('上传成功');
       //   });
         // });

       },

        jiQis(){
          this.$axios({
            method:'get',
            url:'/getjiQis',
          }).then(response=>{
            this.JiQis=response.data.jiQis;
          });
        },



        importf(obj) {
          //导入
          if (!obj.target.files) {
            return;
          }
          var f =obj.target.files[0];
          this.beforeUpload(f);
          console.log(f);
          var reader = new FileReader();
          var result = [];
          let that=this;
          reader.onload = function(e) {
            var data = e.target.result;
            //获取xlsx对象
            var workbook = XLSX.read(data, {
              type: "binary"
            });
           let list=  XLSX.utils.sheet_to_json(
              workbook.Sheets[workbook.SheetNames[0]]
            );
           this.excelData=[];
           list.forEach((item,index)=>{
             that.excelData.push(item);
            });

          };
          reader.readAsBinaryString(f);


        }


      },

    }




</script>

<style scoped>

</style>
