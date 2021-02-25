<template>
    <Submenu :name="parentItem.name">
        <template slot="title">
            <Icon :type="parentItem.meta.icon" />
            {{parentItem.meta.title}}
        </template>
        <template v-for="item in children">
            <side-menu-item v-if="item.children" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
            <menu-item v-else-if="item.meta.isshow" :key="`menu-${item.name}`" :name="item.name">{{item.meta.title}}</menu-item>
        </template>
    </Submenu>
</template>

<script>
export default {
    name:"SideMenuItem",
    data(){
        return{
        }
    },
    props:{
        parentItem: {
            type: Object,
            default: () => {}
        },
    },
    computed: {
        children () {
            return this.parentItem.children
        }
  }
}
</script>

<style>

</style>