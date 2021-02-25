<template>
    <div>
        <div v-if="adminor">
            <div class="content">
                <div style="padding:10px 0">
                    <label for class="select">选择月份：</label>
                    <DatePicker type="month" placeholder="选择月份" style="width: 200px" v-model="value1"></DatePicker>
                    <Button type="info" @click="uploading">上传</Button>
                    <Button type="info" @click="shauxin" style="margin:0 10px">刷新列表</Button>
                    <label for class="select">筛选：</label>
                    <Select v-model="model112" style="width:200px" @on-change="selectList()">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            
                <form class="layui-form" id="authorization-upload"  enctype="multipart/form-data" >
                    <div class="layui-form-item layui-inline">
                        <div class="layui-inline">
                                <input type="file"  name="file" ref="clearFile"  required  lay-verify="required"  autocomplete="off" id="layui-upload" class="layui-input layui-upload" @change="a"> 
                        </div>
                    </div>    
                </form>
            </div>
            <div v-if="tiaos">
                <p>导入成功条数：{{detailMap.successCount}}</p>
                <p>导入失败条数：{{detailMap.errorCount}}</p>
            </div>
            
            <div>
                <Table border :columns="columns12" :data="singleDoctorList">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
                <Page :total="dataCount" class="page" @on-change="changePage" />
            </div>
        </div>
        <div v-if="!adminor" style="width:90%;margin: 0 auto;text-align: center;">
            <div class="password">
                    <label for>请输入管理密码：</label>
                    <Input v-model="value" placeholder="请输入管理密码" style="width: 300px" />
                    <Button type="success" style="margin-left: 10px;" @click="autuList">进入</Button>
            </div>
          
        </div>
        <Row v-if="jiaz">
            <Col class="demo-spin-col" span="20">
            <Spin fix>
                <Icon type="ios-loading" size=50 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
        </Row>
        
    </div>
    
</template>

<script>
import http from '@/utils/http';
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+ mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当天日期
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
export default {
    data(){
        return{
            cityList: [
                    {
                        value: '1',
                        label: '成功'
                    },
                    {
                        value: '0',
                        label: '失败'
                    },
                ],
                model112: '',
            jiaz:false,
            adminor:false,
            value:'',
            passworld:'130824',
            permissionvalue1:false,
            cunindex:'',
            data1:[],
            singleDoctorList:[],
            model1:'',
            columns12: [
                    {
                        title: '职员姓名',
                        slot: 'name'
                    },
                    {
                        title: '备注',
                        key:"remark"
                    },
                    {
                        title: '月份',
                        key:"month"
                    },{
                        title: '状态',
                        key:"result"
                    },{
                        title: '操作时间',
                        key:"created_at"
                    },
                    // {
                    //     title: '操作',
                    //     slot: 'action',
                    //     width: 300,
                    //     align: 'center'
                    // }
                ],
            data6: [],
            imager:'',
            imafs:false,
            value1:currentDay,
            l:'',
            detailMap:{},
            tiaos:false,
            //分页
            pageSize: 10, //每页显示多少条
            dataCount: 0, //总条数
            pageCurrent: 1, //当前页
        }
    },
    methods: {
        //进入
            autuList(){
                if(this.value==this.passworld){
                    this.adminor=true;
                }else{
                    this.$Message.warning('密码输入错误');
                }
            },
        shauxin(){
            var that = this;
            that.selectList();
            that.pageCurrent=1;
            that.tiaos=false;
        },
        //标准时间转换
            datatime(data) {
              var d = data;
              var y = this.p(d.getFullYear());
              var m = this.p(d.getMonth() + 1);
              var t = this.p(d.getDate());
              var resDate = y + "-" + m;
              return resDate;
            },
            p(s) {
              return s < 10 ? "0" + s : s;
            },
        a(e){
            this.file=e.target.files[0];
        },
        fan(){
            this.imafs=!this.imafs
        },
       async uploading() {
            var url ="import/salaryData";
            var that = this;
            var myform = new FormData();
            myform.append('file',that.file);
            myform.append('month',that.datatime(that.value1));
            var data = myform
            that.jiaz=true;
            var res  = await http.file(that,url,data);
            that.jiaz=false;
            if(res.errcode==0){
                that.$Message.info('导入成功');
                that.tiaos=true;
                that.$refs.clearFile.value = ''; // 清空file文件
                that.selectList(res.data.operation_id);
            }
        },
        //分页
            changePage(value){
                this.pageCurrent=value;
                this.selectList();
            },
        async selectList(operation_id){
            var that = this;
            var url = 'import/record';
            var data ={
                operation_id,
                result:that.model112,	
                // created_at_start,
                // created_at_end,
                limit:that.pageSize,
                offset:that.pageCurrent,
            }
            var res = await http.post(that,url,data);
            if(res.errcode==0){
                that.dataCount=res.data.total;
                that.singleDoctorList=res.data.content;
                that.detailMap=res.data.detailMap;
                for(var i=0;i<that.singleDoctorList.length;i++){
                    if(that.singleDoctorList[i].result==1){
                        that.singleDoctorList[i].result='成功'
                    }else{
                         that.singleDoctorList[i].result='失败'
                    }
                }
            }
        }
    },
    mounted() {
        this.selectList()
    },
}
</script>

<style scoped>
.content{
    padding: 20px 0 20px 0;
    width: 100%;
}
.card{
    text-align: center;
    padding: 100px 0;
}
.password{
    margin: 100px auto;
    
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100%;
        position: relative;
        position: fixed;
        top: 0;
    }
</style>