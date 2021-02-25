<template>
<div style="width:90%;" class="patientlist_page">
    <div class="content">
        <Button @click="addShow()">新增标题</Button>
    </div>
    <Table border :columns="columns12" :data="data" >
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" style="margin-right: 5px" size="small" @click="updateShow(index)">修改</Button>
             <Button type="error" size="small" @click="delateShow(index)">删除</Button>
        </template>
    </Table>
        <Modal
            v-model="modal"
            title="添加"
            @on-ok="addTitle()" >
            <Input v-model="value" placeholder="请输入内容" style="width: 500px; display: block;margin: 0 auto;" />
        </Modal>
        <Modal
            v-model="modal1"
            title="修改"
            @on-ok="updateTitle()" >
            <Input v-model="value1" placeholder="请输入内容" style="width: 500px; display: block;margin: 0 auto;" />
        </Modal>
        <Modal
            v-model="modal2"
            title="提示"
            @on-ok="delateTitle()" >
            确认要删除吗
        </Modal>
        <Row v-if="jiaz">
            <Col class="demo-spin-col" span="20">
            <Spin fix>
                <Icon type="ios-loading" size=50 class="demo-spin-icon-load"></Icon>
                <div>加载中...</div>
            </Spin>
        </Col>
        </Row>
</div>
    
</template>
<script>
import http from '@/utils/http';
    export default {                                                             
        data () {
            return {
                jiaz:false,
                modal:false,
                columns12: [
                    {
                        title:'子标题Id',
                        key:'union_welfare_second_id',
                        align: 'center'
                    },
                    {
                        title:'子标题信息',
                        key:'union_welfare_second_title',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        // width: 150,
                        align: 'center'
                    }
                ],
                data:[

                ],
                value:'',
                modal1:false,
                value1:'',
                titleId:'',
                modal2:false,
                delatetitleId:''
            }
        },
        methods: {
            
            //添加
            async addTitle(){
                var that = this;
                var map =JSON.parse(localStorage.getItem('titleMap'));
                var union_welfare_id = map.id;
                var url = 'admin/addWelfareSecondTitle';
                var data = {
                    union_welfare_second_title:that.value,
                    union_welfare_id
                }   
                 that.jiaz=true; 
                var res = await http.post(that,url,data);
                 that.jiaz=false; 
                if(res.errcode==0){
                     that.value = '';
                    that.selectList()
                }
            },
            //查询
            async selectList(){
                var that = this;
                var url = 'admin/queryWelfareSecondTitle';
                var map =JSON.parse(localStorage.getItem('titleMap'));
                var union_welfare_id = map.id;
                var data = {
                    union_welfare_id
                }  
                that.jiaz=true; 
                var res = await http.post(that,url,data);
                that.jiaz=false;
                if(res.errcode==0){
                    that.data =  res.data;
                }
            },
            addShow(){
                this.modal = true;
            },
            updateShow(index){
                this.modal1 = true;
                this.titleId = this.data[index].union_welfare_second_id;
                this.value1 = this.data[index].union_welfare_second_title;
            },
            //修改
            async updateTitle(){
                var that = this;
                var url = 'admin/updateWelfareSecondTitle';
                var data = {
                    new_second_title:that.value1,
                    union_welfare_second_id:that.titleId 
                }   
                 that.jiaz=true; 
                var res = await http.post(that,url,data);
                 that.jiaz=false; 
                if(res.errcode==0){
                     that.selectList()
                }
            },
            delateShow(index){
                this.modal2 = true;
                this.delatetitleId = this.data[index].union_welfare_second_id;
            },
            async delateTitle(){
                var that = this;
                var url = 'admin/deleteWelfareSecondTitle';
                var data = {
                    union_welfare_second_id:that.delatetitleId 
                }   
                 that.jiaz=true; 
                var res = await http.post(that,url,data);
                 that.jiaz=false; 
                if(res.errcode==0){
                     that.selectList()
                }
            },
        },
        created() {
            this.selectList();
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