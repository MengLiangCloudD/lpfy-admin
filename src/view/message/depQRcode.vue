<template>
    <div>
        <div class="content">
            <span  v-if="imafs" style="color:blue;cursor:pointer" @click="fan">返回</span>
        </div>
        <div class="card" v-if="imafs">
            <img :src="imager" alt="" width="400">
        </div>
        <div v-if="!imafs">
            <Table border :columns="columns12" :data="singleDoctorList">
                <template slot-scope="{ row }" slot="depname">
                    <strong>{{ row.depname }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">生成科室二维码</Button>
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
                        title: '科室名称',
                        slot: 'depname'
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
            var url ="admin/genDeptQRCode";
            var that = this;
            var depCode=that.singleDoctorList[index].depCode
            var data = {
                depCode
            }
            var res  = await http.post(that,url,data);
            if(res.errcode==0){
                that.imafs=true;
                that.imager=res.data.QRCode;
                }
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
                    that.singleDoctorList =res.data;
                }
        },
    //    async selectinquire(value){
    //         let that = this;
    //         var depCode =value.value;
    //         var url  = 'admin/doctorList';
    //         var data  ={
    //             depCode
    //         }
    //         var res  = await http.post(that,url,data);
    //         that.imafs=false;
    //         that.singleDoctorList = [];
    //         if(res.errcode==0&&res.data!==null){
    //             that.singleDoctorList =res.data;
    //         }
    //         return that.singleDoctorList;
    //     },
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