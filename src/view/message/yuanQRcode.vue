<template>
    <div>
        <div class="card">
            <img :src="imager" alt="" width="400">
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                imager:''
            }
        },
        methods: {
            async show (index) {
                var that = this;
                var url ="admin/genHospitalQRCode";
                var that = this;
                var data = {

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    that.imager=res.data.QRCode;
                    }
            },
        },
        mounted() {
            this.show();
        },
    }
</script>

<style scoped>
.card{
    text-align: center;
    padding: 100px 0;
}
</style>