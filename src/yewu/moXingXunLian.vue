<template>
    <div style="width: 75%;margin: 15px auto;">
      <el-row :gutter="20">
        <el-col :span="20">
          <label >训练样本文件</label>
            <el-upload
              style="display:inline-block"
              :limit="1"
              ref="upload"
              action="http://localhost:8081/moXing/file"
              :file-list="file"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary" plain>浏览</el-button>
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
          </el-form>
          <el-form :inline="true" :model="form2"  >
            <el-form-item label="训练次数">
              <el-input v-model="form2.ciShu"  ></el-input>
            </el-form-item>
            <el-form-item label="网络误差">
              <el-input v-model="form2.wuSha"  ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <el-radio-group v-model="jiqi"   size="mini"   @change="getData(jiqi)" style="margin-left: 15px;">
              <el-radio :label="item" v-for=" item in JiQis" :key="item" style="margin:15px;">{{item+'号机组'}}</el-radio><br/>
            </el-radio-group>
          </el-card>
          <el-card class="box-card" style="margin-top:15px;">
            <br/>
            <el-button style="margin-top:5px;margin-left: 10px;" type="primary">数据处理</el-button>
            <el-button style="margin-top:5px;" type="success">拟合学习</el-button>
            <el-button style="margin-top:5px;" type="info">保存网络</el-button>
          </el-card>
        </el-col>
      </el-row>


    </div>
</template>

<script>
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
            },
            JiQis:[],
            jiqi:"",
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
          this.jiQis();
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
