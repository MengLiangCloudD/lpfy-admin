<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" :theme="theme" :active-name="activeName" :open-names="openedNames" @on-select="handleSelect" accordion>
            <template v-for="item in menuList">
                <side-menu-item v-if="item.children" :parent-item="item"></side-menu-item>
                <menu-item v-else :name="item.name" v-if="item.meta.isshow=='true'">
                    <Icon :type="item.meta.icon" />
                    {{item.meta.title}}
                </menu-item>
            </template>
        </Menu>
    </div>
</template>

<script>
import SideMenuItem from './side-menu-item.vue'
import { getUnion } from '@/libs/tool'
export default {
    props: {
        theme: {
            type: String,
            default: 'dark'
        },
        activeName: {
            type: String,
            default: ''
        },
        menuList: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        SideMenuItem
    },
    data(){
        return{
            openedNames: ["index"]
        }
    },
    watch:{
        activeName(name){
            this.openedNames = this.getOpenedNamesByActiveName(name)
        },
        openedNames(){
             this.$nextTick(() => {
                 this.$refs.menu.updateOpened()
             })
        }
        
    },
    methods:{
        handleSelect(name){
            this.$emit('on-select', name)
        },
        getOpenedNamesByActiveName (name) {
            return this.$route.matched.map(item => item.name).filter(item => item !== name)
        },
    },
    created(){
        var herf = window.location.href; 
        var a = herf.split('/');
        var name = a[a.length-1];
        this.openedNames = this.getOpenedNamesByActiveName(name)
    }
}
</script>

<style>

</style>