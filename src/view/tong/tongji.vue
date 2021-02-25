<template>
    <div  style="width:90%;" class="patientlist_page">
        <DatePicker type="daterange" placement="bottom-end" v-model="value" placeholder="选择时间" style="width: 250px;margin-right:30px" @on-change="xuanze()"></DatePicker>
        <Button type="primary" @click="sekectTime">查询</Button>
        <div class="content">
           挂号人数：{{number}}人
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                value:'',
                number:0
            }
        },
        methods: {
            xuanze(){
                this.created_at1 = this.value[0];
                this.created_at2 = this.value[1]
            },
            datatime(data) {
              var d = data;
              var y = this.p(d.getFullYear());
              var m = this.p(d.getMonth() + 1);
              var t = this.p(d.getDate());
              var resDate = y + "-" + m + "-" + t;
              return resDate;
            },
            p(s) {
              return s < 10 ? "0" + s : s;
            },
            async sekectTime(){
                var url = 'evaluate/queryCount'
                var created_at1 = this.datatime(this.created_at1);
                var created_at2 = this.datatime(this.created_at2);
                var data = {
                    created_at1,
                    created_at2
                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    this.number = res.data;
                }
            }
        },
    }
</script>

<style scoped>
.patientlist_page{
    width:90%;
    margin: 0 auto;
}
.content{
    padding: 80px;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
}
</style>