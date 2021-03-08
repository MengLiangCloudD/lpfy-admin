<template>
    <div class="wrop">
        <div class="content">
             <Table :columns="columns1" :data="data1"></Table>
             <div class="bottom">
                  <Page :total="total" @on-change="qiehuan"/>
             </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                limit:10,
                total:0,
                offset:1,
                columns1:[
                        {
                            title: '用户姓名',
                            key: 'userName'
                        },
                        {
                            title: '卡号',
                            key: 'cardNo'
                        },
                        {
                            title: '访问目录',
                            key: 'courseName'
                        },
                ],
                data1:[]
            }
        },
        methods: {
            async selectList(){
                var url = 'queryNumber';
                var data = {
                    linkingId:this.$route.query.linkingId,
                    limit:this.limit,
                    offset:this.offset
                }
                var res = await http.post(this,url,data);
                if(res.errcode ===0){
                    this.total = res.data.total;
                    this.data1=res.data.content;
                }
            },
            qiehuan(value){
                this.offset=value;
                this.selectList();
            }
        },
        created(){
            this.selectList();
        }
    }
</script>

<style scoped>
.wrop{
    padding: 20px;
}
.content{
    margin-top: 30px;
}
.bottom{
    margin-top:30px;
    text-align: center;
}
</style>