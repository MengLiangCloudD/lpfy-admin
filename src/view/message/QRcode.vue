<template>
    <div>
        <div class="content">
            <label for class="select">科室名称：</label>
            <Select v-model="model1" style="width:150px" @on-change="selectinquire" :label-in-value="true">
                <Option v-for="item in data1" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
            <!-- <Button type="success">生成科室二维码</Button> -->
            <span  v-if="imafs" style="color:blue;cursor:pointer" @click="fan">返回</span>
        </div>
        <div class="card" v-if="imafs">
            <img :src="imager" alt="" width="400">
        </div>
        <div v-if="!imafs">
            <Table border :columns="columns12" :data="singleDoctorList">
                <template slot-scope="{ row }" slot="docCode">
                    <strong>{{ row.docCode }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">生成医生二维码</Button>
                </template>
            </Table>
        </div>
        
    </div>
    
</template>

<script>
import http from '@/utils/http';
export default {
    data(){
        
        return{
            permissionvalue1:false,
            cunindex:'',
            data1:[],
            singleDoctorList:[],
            model1:'',
            columns12: [
                    {
                        title: '医生姓名',
                        slot: 'docCode'
                    },
                    {
                        title: '科室',
                        key:"deptname"
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
            data6: [],
            imager:'',
            imafs:false
        }
    },
    methods: {
        fan(){
            this.imafs=!this.imafs
        },
         async show (index) {
            var that = this;
            var url ="admin/genDoctorQRCode";
            var that = this;
            var depCode=that.singleDoctorList[index].depCode
            var docCode=that.singleDoctorList[index].doccode
            var data = {
                docCode,depCode
            }
            var res  = await http.post(that,url,data);
            if(res.errcode==0){
                that.imafs=true;
                that.imager=res.data.QRCode;
                }
        },
        //处理获取医生的数据 此方法只在页面加载时触发一次
        _dealdata(data) {
        
            var _this = this;
            //其他没合并的科室
            for (let i = 0; i < data.length; i++) {
                let depname = "";
                let depCode = ""
                depname = data[i].depname;
                depCode=data[i].depCode;
                let depitem = {
                    //合并科室的名称
                    label: depname,
                    value:depCode
                };
                
                _this.data1.push(depitem);
            }
            // //获取合并之后某个科室的医生（先默认设置为第一个科室）
            // //通过doctortype的键值name来查询对应的科室医生
            
            _this.model1=_this.data1[0].value
            _this.selectinquire(_this.data1[0]);
        },
        //获取合并后的科室信息
       async getDepartments() {
            var url ="admin/deptList";
            var that = this;
            
            var data = {

            }
             var res  = await http.post(that,url,data);
             if(res.errcode==0){
                 
                    // 调用合并科室
                    that._dealdata(res.data);
                }
        },
       async selectinquire(value){
            let that = this;
            var depCode =value.value;
            var url  = 'admin/doctorList';
            var data  ={
                depCode
            }
            var res  = await http.post(that,url,data);
            that.imafs=false;
            that.singleDoctorList = [];
            if(res.errcode==0&&res.data!==null){
                that.singleDoctorList =res.data;
            }
            return that.singleDoctorList;
        },
    },
    mounted() {
        this.getDepartments()
    },
}
</script>

<style>
.content{
    padding: 20px 0 20px 0;
    width: 100%;
}
.card{
    text-align: center;
    padding: 100px 0;
}
</style>