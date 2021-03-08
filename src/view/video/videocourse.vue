<template>
    <div class="wrop">
        <div class="title">
            <label for="">输入链接介绍：</label>
             <Input v-model="value" placeholder="请输入链接介绍" style="width: 300px;margin-right: 30px;" />
             <label for="">输入链接地址：</label>
             <Input v-model="value1" placeholder="请输入链接地址" style="width: 300px;margin-right: 30px;" />
             <Button type="primary" @click="getCode()">添加</Button>
        </div>
        <div class="content">
             <Table :columns="columns1" :data="data1">
                 <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="gopeopleNumber(index)">查看</Button>
                </template>
             </Table>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                value:'',
                value1:'',
                columns1:[
                        {
                            title: '介绍',
                            key: 'name'
                        },
                        {
                            title: '地址',
                            key: 'content'
                        },{
                            title: 'Action',
                            slot: 'action',
                            width: 150,
                            align: 'center'
                        }
                ],
                data1:[]
            }
        },
        methods: {
            async getCode(){
                var url = 'uploadCourseLinking';
                var data = {
                    name:this.value,
                    content:this.value1
                }
                if(this.value===''||this.value1===''){
                    this.$Message.warning('请将信息填写完整');
                    return
                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    this.selectList();
                }
            },
            async selectList(){
                var url = 'queryLinkingList';
                var data = {

                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    this.data1 = res.data;
                }
            },
            gopeopleNumber(index){
                this.$router.push(`/video/peopleNumber?linkingId=${this.data1[index].id}`)
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
</style>