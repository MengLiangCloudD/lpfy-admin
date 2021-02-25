<template>
<div style="width:90%;" class="patientlist_page">
    <div class="content">
        <Button @click="shua">更新列表</Button>
    </div>
    <Table border :columns="columns12" :data="data" >
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" >查看</Button>
            <Button type="error" size="small" @click="subChangePermis1(index)">退款</Button>
        </template>
    </Table>
    
    <Modal
            v-model="permissionvalue1"
            title="提示"
            @on-ok="remove()" >
            <p class="tut">您确定要退订吗？</p>
            <Input v-model="value" placeholder="请输入退款码" style="width: 300px" />
        </Modal>
</div>
    
</template>
<script>
import http from '@/utils/http';
    export default {
        data () {
            return {
                permissionvalue1:false,
                cunindex:'',
                columns12: [
                    {
                        title:'患者姓名',
                        key:'name'
                    },
                    {
                        title:'订单状态',
                        key:'order_Status'
                    },
                    {
                        title: '主治医师',
                        key: 'doctorName'
                    },
                    {
                        title:'就诊科室',
                        key:'deptName'
                    },
                    {
                        title: '订单编号',
                        key: 'orderNo'
                    },
                    {
                        title: '订单内容',
                        key: 'orderContent'
                    },
                    {
                        title:'下单时间',
                        key:'created_at'
                    },
                    {
                        title:'费用',
                        key:'totalFee'
                    },
                     
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data:[],
                model1: [],
                name: "",
                value:''
            }
        },
        methods: {
            shua(){
               this.select();
            },
            subChangePermis1(index){
                this.cunindex  = index;
                this.permissionvalue1=true;
            },
            async remove () {
                var that = this;
                var url = 'patRegRef/handlerNoVisitGhPassTimeOrders'
                var index =that.cunindex ;
                var password = that.value;
               var orderNo= that.data[index].orderNo;
                if(password!==''){
                    var data  = {
                        orderNo,password
                    }
                    var res  = await http.post(that,url,data);
                    if(res.errcode==0){
                        that.select();
                        that.$Message.success(res.errmsg);
                    }else{
                        that.$Message.warning(res.errmsg);
                    }
                }else{
                    that.$Message.warning('请先输入退款码');
                }
            },
            async select(){
                var that = this;
                var url  ='patRegRef/noVisitGhOrders';
                var  data = {

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    that.data=res.data;
                    for(var i =0;i<that.data.length;i++){
                        that.data[i].orderContent='挂号'
                        if(that.data[i].orderStatus==4){
                            that.data[i].order_Status='已申请退款'
                        }
                        if(that.data[i].orderStatus==1){
                            that.data[i].order_Status='未就诊订单'
                        }
                    }
                }
            }
        },
        created() {
            this.select()
        },
    }
</script>

<style  scoped>
.patientlist_page{
    width:90%;
    margin: 0 auto;
}
.tittle {
  padding: 10px;
}
.tittle p:nth-child(1) {
  font-size: 18px;
}
.tittle p {
  line-height: 2;
}
.patientlist_page {
   width:90%;
    margin: 0 auto;
}
.content{
    padding: 20px 0 20px 0;
    font-size: 18px;
    color: #aaa;
    cursor: pointer;
}
.page {
  margin-top: 20px;
}
.tut{
    font-size: 18px;
    font-weight: 600;
}
</style>