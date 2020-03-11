<template>
    <div style="width: 75%;margin: 15px auto;">
      <el-row :gutter="20">
        <el-col :span="20">
          <label >训练样本文件</label>
<!--            <el-upload-->
<!--              style="display:inline-block"-->
<!--              :limit="1"-->
<!--              ref="upload"-->
<!--              action="http://localhost:8081/moXing/file"-->
<!--              :file-list="file"-->
<!--              :auto-upload="false">-->
<!--              <el-button slot="trigger" size="small" type="primary" plain>浏览</el-button>-->
<!--            </el-upload>-->
          <el-upload
            :action="1000"
            :before-upload="beforeUpload"
            accept="xlsx,xls"
          >
            <el-tooltip class="item" effect="dark" content="excel格式:ID|xiaoLv|ShuiTou|ChuLi|LiuLiang" placement="top-start">
              <el-button size="small" type="primary">上传excel</el-button>
            </el-tooltip>
          </el-upload>

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
            <el-form-item label="训练次数">
              <el-input v-model="form.ciShu"  ></el-input>
            </el-form-item>
            <el-form-item label="网络误差">
              <el-input v-model="form.wuCha"  ></el-input>
            </el-form-item>
          </el-form>

        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <el-radio-group v-model="jiqi"   size="mini"     style="margin-left: 15px;">
<!--              <el-radio :label="item" v-for=" item in JiQis" :key="item" style="margin:15px;">{{item+'号机组'}}</el-radio><br/>-->
              <el-radio :label="1"   :key="1" style="margin:15px;">{{1+'号机组'}}</el-radio><br/>
              <el-radio :label="2"   :key="2" style="margin:15px;">{{2+'号机组'}}</el-radio><br/>
            </el-radio-group>
          </el-card>
          <el-card class="box-card" style="margin-top:15px;">
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
  import  axios from 'axios'
    export default {
        name: "moXingXunLian",
      data(){
          return{
            file:[],
            form:{
              yuanShu:'',
              xueXi:'',
              jingDu:'',
              ciShu:'',
              wenDing:'',
              yangBen:'',
              ciShu:'',
              wuCha:'',
              jiqi:''
            },
            JiQis:[],
            jiqi:1,
            form2:{
              ciShu:'',
              wuCha:'',
            },
          }
      },
      created(){
        this.init();
      },
      methods:{
        init(){
         // this.jiQis();
        },
        niHe(){
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
            data:{'jiqi':this.jiqi},
          }).then(response=>{
            this.$message('操作成功!')
          })
        },
        data_process(){
            this.$axios({
              method:'post',
              url:'data_process',
              data:{'jiqi':this.jiqi},
            }).then(response=>{
               this.$message('模型重新训练成功!')
            })
        },
        beforeUpload(file){

          this.$confirm('此操作将清除机器'+this.jiqi+'原有数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            let formData = new FormData();
            formData.append('file',file);
            formData.append('jiqi',this.jiqi);
            axios.post('/addBatch',formData).then((res)=>{
            this.$message('上传成功');
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

      },

    }
</script>

<style scoped>

</style>
