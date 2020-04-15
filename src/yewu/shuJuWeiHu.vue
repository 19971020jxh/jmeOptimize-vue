<template>
<!--    数据维护页面-->
  <div >
    <div style="width: 88%;margin: 0 auto">
    <el-row>
      <el-col :span="18">
        <h3 style="margin-left: 15px">分组数据</h3>
        <el-form :inline="true" :model="nowSelect"  >
          <el-form-item v-if="false" >
            <el-input   v-model.number="nowSelect.id"  ></el-input>
          </el-form-item>
          <el-form-item v-if="false" >
            <el-input   v-model.number="nowSelect.jiqi"  ></el-input>
          </el-form-item>
          <el-form-item label="效率">
            <el-input-number id="oneInput"  v-model="nowSelect.xiaolv" type="number" :step="1"  ></el-input-number>
          </el-form-item>
          <el-form-item label="水头">
            <el-input-number  v-model="nowSelect.shuitou" type="number" :step="1"  ></el-input-number>
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
            prop="xiaolv"
            label="效率"
            width="180">
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
        <div style="margin-top: 15px;" >
          <el-button @click="nextRow" >上一条</el-button>
          <el-button @click="lastRow" >下一条</el-button>
        </div>
      </el-col>

      <el-col :span="5" style="margin-left: 15px;margin-top: 15px;">
        <el-card class="box-card">
          <el-radio-group v-model="jiqi"   size="mini"   @change="getData(jiqi)" style="margin-left: 15px;">
            <el-radio   :label="1"  :key="1" style="margin:15px;">{{1+'号机组'}}</el-radio><br/>
            <el-radio   :label="2"   :key="2" style="margin:15px;">{{2+'号机组'}}</el-radio><br/>
            <el-radio   :label="31"  :key="31" style="margin:15px;">{{3+'号机组大水轮'}}</el-radio>
            <el-radio   :label="32"  :key="32" style="margin:15px;">{{3+'号机组小水轮'}}</el-radio>
          </el-radio-group>
        </el-card>
        <el-card class="box-card" style="margin-top: 15px;text-align: center">
          <el-button  @click="add" size="medium" :type="addColor" style="margin-bottom: 5px;">{{addName}}</el-button><br/>
          <el-button  @click="update" size="medium" :type="updateColor" style="margin-bottom: 5px;">{{updateName}}</el-button><br/>
          <el-button  @click="Jdelete" size="medium" :type="deleteColor" style="margin-bottom: 5px;">{{deleteName}}</el-button><br/>
          <el-button  @click="keep()" size="medium" :type="needKeep==0?'warning':'danger'" style="margin-bottom: 5px;">{{needKeep==0?'保存':'点击保存'}}</el-button><br/>
          <el-button  @click="batchDialog=true" size="medium"   style="margin-bottom: 5px;">批量</el-button><br/>
        </el-card>
      </el-col>
    </el-row>
    </div>

    <el-dialog title="批量操作" :visible.sync="batchDialog">
      <el-upload
       :action="1000"
       :before-upload="beforeUpload"
       accept="xlsx,xls"
      >
        <el-tooltip class="item" effect="dark" content="excel格式:ID|xiaoLv|ShuiTou|ChuLi|LiuLiang" placement="top-start">
        <el-button size="small" type="primary">上传excel[批量添加]</el-button>
        </el-tooltip>
      </el-upload>
      <el-button size="small" type="warning"   @click="excel" >下载excel[已选择机器{{jiqi}}]</el-button>
    </el-dialog>
  </div>
</template>

<script>
    import  axios from 'axios'
    export default {
      name: "shuJuWeiHu",
      data(){
          return {
            nowSelect:{},
            JiQis:[],
            data:[],
            jiqi:1,
            batchDialog:false,
            rowHeight:40,
            addNumber:0,
            addName:'新增',
            addColor:'primary',
            updateName:'修改',
            updateColor:'success',
            deleteColor:'info',
            deleteName:'删除',
            needKeep:0,
          }
      },
      created(){
      this.init();
      window.addEventListener('beforeunload',   this.closeKeep())
      },
      destroyed(){
        window.removeEventListener('beforeunload',   this.closeKeep())
      },

      methods:{
        closeKeep(){
           if(this.needKeep!=0){
             this.keep();
           }
        },
        beforeUpload(file){
          let formData = new FormData();
          formData.append('file',file);
          formData.append('jiqi',this.jiqi);
          axios.post('/addBatch',formData).then((res)=>{
            this.$message('添加成功');
          });
          return false;
        },
        init(){
          this.getData(this.jiqi);
        },
        excel(){
          this.$axios({
            method:'get',
            url:'/excels',
            params:{jiqi:this.jiqi},
            responseType:'blob',
          }).then(response=>{
            let blob =new Blob([response.data])
            let downElement=document.createElement('a');
            let herf=window.URL.createObjectURL(blob);
            downElement.href=herf;
            downElement.download='机器'+this.jiqi+'数据.xlsx';
            document.body.appendChild(downElement);
            downElement.click();
            document.body.removeChild(downElement);
            window.URL.revokeObjectURL(herf);

          })
        },
        keep(){
          let url='';
          if(this.jiqi==1){
            url='keep_1'
          }
          if(this.jiqi==2){
            url='keep_2'
          }
          if(this.jiqi==31){
            url='keep_31';
          }
          if(this.jiqi==32){
            url='keep_32';
          }
          const loading = this.$loading({
            lock: true,
            text: '数据保存中。。。。',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios({
            method:'post',
            url:url,
            headers:{
              'Content-Type': 'application/json'
            },
            data:{'list':JSON.stringify(this.data)}
          }).then(response=>{
                this.needKeep=0;// 恢复
                loading.close();
                this.$message("保存成功!")
          })
        },
        Jdelete(){
          if(this.nowSelect=={}){
            this.$message('请选中数据!');
            return false;
          }
          this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getDelete();
          })
        },
        getDelete(){
          // this.nowSelect.jiqi=this.jiqi;
          // this.$axios({
          //   method:'get',
          //   url:'/getDelete',
          //   params:this.nowSelect,
          // }).then(response=>{
            this.$message('删除成功');
            this.data.splice(this.data.indexOf(this.nowSelect),1);
            this.nowSelect={};
            this.needKeep=1;
        //  })
        },
        update(){
          if(this.validate()){
            return;
          }
          this.getUpdate();
        },
        getUpdate(){
          // this.nowSelect.jiqi=this.jiqi;
          // this.$axios({
          //   method:'get',
          //   url:'/getUpdate',
          //   params:this.nowSelect,
          // }).then(response=>{
            this.$message('修改成功');
           // this.data[this.data.indexOf(response.data.old)]=this.nowSelect;
            this.needKeep=1;
        //  });
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
        // jiQis(){
        //   this.$axios({
        //     method:'get',
        //     url:'/getjiQis',
        //   }).then(response=>{
        //     this.JiQis=response.data.jiQis;
        //     this.getData(this.JiQis[0]);
        //   });
        // },
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
          // this.nowSelect.jiqi=this.jiqi;
          // console.log(this.nowSelect)
          // this.$axios({
          //   method:'get',
          //   url:'/addData',
          //   params: this.nowSelect,
          // }).then(response=>{
            this.$message('添加成功!');
            this.data.push(this.nowSelect);
            this.addColor='primary';
            this.addName='新增';
            this.nowSelect={};
            this.$refs.table.bodyWrapper.scrollTop=this.$refs.table.bodyWrapper.scrollHeight;
            this.needKeep=1;
          // })
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
