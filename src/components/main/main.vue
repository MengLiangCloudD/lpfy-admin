<template>
    <Layout style="height: 100%">
        <Sider hide-trigger collapsible :width="240" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
            <side-menu theme="dark" :active-name="$route.name" @on-select="turnToPage" :menu-list="menuList">
                <div class="logo-con">
                    <img src="../../assets/images/logo.png" key="max-logo"  width=""/>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="layout-header-bar">
                <!-- <header-bar></header-bar> -->
                
                 <div class="login">
                     <p class="icon1">滦平县妇幼保健医院</p>
                    <Dropdown class="icon" @on-click="outlogin()">
                    <a href="javascript:void(0)">
                       <img src="./../../assets/images/avatar.png" alt="" class="inm">
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem >刘淑琴</DropdownItem>
                        <DropdownItem>注销</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                    <Content class="content-wrapper">
                        <router-view/>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
import SideMenu from './components/side-menu'
import TagsNav from './components/tags-nav'
import HeaderBar from './components/header-bar'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList,routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import "./index.css"
export default {
    components: {
        SideMenu,
        TagsNav,
        HeaderBar
    },
    data(){
        return{
            collapsed:false,
        }
    },
    watch:{
        '$route' (newRoute) {
            const { name, query, params, meta } = newRoute
            this.addTag({
                route: { name, query, params, meta },
                type: 'push'
            })
            this.setBreadCrumb(newRoute)
            this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
            // this.$refs.sideMenu.updateOpenName(newRoute.name)
        }
    },
    computed:{
        menuList () {
            return this.$store.getters.menuList
        },
        tagNavList () {
            return this.$store.state.app.tagNavList
        },
    },
    created(){
    },
    mounted(){
        this.setTagNavList()
        this.setHomeRoute(routers)
        const { name, params, query, meta } = this.$route
        this.addTag({
            route: { name, params, query, meta }
        })
        
        this.setBreadCrumb(this.$route)
    },
    methods:{
        ...mapMutations([
        'setTagNavList',
        "addTag",
        "closeTag",
        "setBreadCrumb",
        "setHomeRoute"
        ]),
        turnToPage(route){
            let { name, params, query } = {}
            name = route
            this.$router.push({
                name,
                params,
                query
            })
        },
        handleClick(item){
            this.turnToPage(item.name)
        },
        handleCloseTag(res, type, route){
            if (type !== 'others') {
                if (type === 'all') {
                    this.turnToPage(this.$config.homeName)
                } else {
                    if (routeEqual(this.$route, route)) {
                        this.closeTag(route)
                    }
                }
            }
            this.setTagNavList(res)
        },
        outlogin(){
            // debugger
            // this.$router.push({ path: '/login' });
        }
    }
}
</script>
<style scoped>
.login{
    position: relative;
    
}
.ivu-layout-header{
line-height: 0;
height: 50px;
}
.icon{
    position:absolute;
    right: 0;
    top: 10px;
}
.icon1{
    position:absolute;
    padding:16px 0;
    font-size: 25px;
    font-weight: 900;
    left: 0;
    top: 10px;
}
.inm{
    border-radius: 50%;
    width: 30px;
}
</style>