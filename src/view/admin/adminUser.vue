<template>
    <div class="user" >
        <Table border :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template  slot="action">
                <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="changePermission(index)">修改权限</Button> -->
                <Button type="primary" size="small" style="margin-right: 5px">修改权限</Button>
                <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
                <Button type="error" size="small" >删除</Button>
            </template>
        </Table>
        <Modal
            v-model="permissionvalue"
            title="修改权限"
            @on-ok="subChangePermis"
            @on-cancel="cancel">
            <CheckboxGroup v-model="checkAllGroup">
                    <Checkbox label="用户管理"></Checkbox>
                    <Checkbox label="医院管理"></Checkbox>
                    <Checkbox label="医生管理"></Checkbox>
                    <Checkbox label="患者管理"></Checkbox>
            </CheckboxGroup>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            columns12: [],
            data6: [],
            changePermissionData:["用户管理","医院管理","医生管理","患者管理"],
            checkAllGroup:[],
            permissionvalue:false
        }
    },
    methods: {
        cancel(){
            this.checkAllGroup=[]
        },
        subChangePermis(){
        },
        changePermission(index){
            this.permissionvalue=true
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
        fetchAdminUsers(){
            this.data6=[{name: '曲博',role: '管理员'}]
            this.columns12=[{title: '管理员姓名',slot: 'name'},{title: '角色',key: 'role'},{title: '操作',slot: 'action',width: 150,align: 'center'}]
        }
    },
    created(){
        this.fetchAdminUsers()
    }
}
</script>

<style>

</style>