<template>
    <div  style="width:90%;" class="patientlist_page">
        <div v-if="adminor">
            <p style="font-size:20px;font-weight: 900;">挂号报表：</p>
            <div class="content">
                <label for>日期：</label>
                <DatePicker
                    v-model="date"
                    type="daterange"
                    placement="bottom-end"
                    placeholder="选择日期"
                    style="width: 150px"
                    class="select"
                    @on-change="timeselect"
                ></DatePicker>
                <label for class="select">订单状态：</label>
                <Select v-model="orderStatus" style="width:150px" @on-change="changeCascader">
                    <Option v-for="item in data1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="success" style="margin-left: 10px;" @click="selectList()">查询</Button>
                <Button  style="margin-left: 10px;" @click="chongzhi">重置</Button>
                <Button type="success" style="margin-left: 10px;" @click="deriveList()">导出报表</Button>
            </div>
            <Table border :columns="columns12" :data="data" >
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
            </Table>
            <Page :total="dataCount" class="page" @on-change="changePage" />
        </div>
        <div v-if="!adminor" style="width:90%;margin: 0 auto;text-align: center;">
            <div class="password">
                    <label for>请输入管理密码：</label>
                    <Input v-model="value" placeholder="请输入管理密码" style="width: 300px" />
                    <Button type="success" style="margin-left: 10px;" @click="autuList">进入</Button>
            </div>
          
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                columns12:[{
                        title:'患者姓名',
                        key:'name'
                    },
                    {
                        title: '患者卡号',
                        key: 'cardno'
                    },
                    {
                        title:'下单时间',
                        key:'payTime'
                    },
                    {
                        title:'费用',
                        key:'total_fee'
                    }],
                data:[],
                //分页
                pageSize: 10, //每页显示多少条
                dataCount: 0, //总条数
                pageCurrent: 1, //当前页
                data1:[{
                    value: '2',
                    label: '已完成',
                    },{
                        value: '3',
                        label: '已退款',
                    },],
                //订单状态
                orderStatus:'',
                //开始日期
                startDate:'',
                //结束日期
                endDate:'',
                adminor:false,
                value:'',
                passworld:'123456',
                date:''
            }
        },
        methods: {
            //分页
            changePage(value){
                this.pageCurrent=value;
                this.selectList();
            },
            //状态
            changeCascader(value){
                this.orderStatus
            },
             //日期
            timeselect(value){
                this.startDate=value[0];
                this.endDate=value[1];
            },
            //重置
            chongzhi(){
                this.orderStatus=''
                this.startDate='';
                this.endDate='';
                this.date=''
                this.pageCurrent=1;
                this.selectList();
            },
            //查询收入报表
            async selectList(){
                var that = this;
                var url = 'reportForm/registerList';
                var limit= that.pageSize;
                var offset=that.pageCurrent;
                var startDate=that.startDate;
                var endDate=that.endDate;
                var orderStatus = that.orderStatus;
                var data = {
                    limit,offset,startDate,endDate,orderStatus
                }   
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.dataCount=parseInt(res.data.counts);
                    that.data=res.data.list;
                }
            },
            //导出报表
            deriveList(){
                var that = this;
                var startDate=that.startDate;
                var endDate=that.endDate;
                var orderStatus = that.orderStatus;
                var url = `http://222.223.131.177:8891/export/registerList?orderStatus=${orderStatus}&startDate=${startDate}&endDate=${endDate}`
                location.href=url
            },
            //进入
            autuList(){
                if(this.value==this.passworld){
                    this.adminor=true;
                }else{
                    this.$Message.warning('密码输入错误');
                }
            }
        },
        created(){
            this.selectList()
        }
    }
</script>

<style scoped>
.patientlist_page{
    width:90%;
    margin: 0 auto;
    
}
.content{
    padding: 20px 0 20px 0;
}
label{
    margin-left: 10px;
}
.ivu-cascader-menu{
    height: 100px !important;
}
.password{
    margin: 100px auto;
}
</style>