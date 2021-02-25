<template>
    <div class="custom-bread-crumb">
        <div class="bar">
            <Breadcrumb :style="{fontSize: `${fontSize}px`}">
            <BreadcrumbItem v-for="(item,index) in list" :key="index">
                <Icon style="margin-right: 4px;" :type="item.meta.icon || ''"/>
                {{ showTitle(item) }}
            </BreadcrumbItem>
            </Breadcrumb>
        </div>
        
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        },
        fontSize: {
            type: Number,
            default: 14
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showTitle (item) {
            debugger
            return item.name
        }
    }
}
</script>

<style>

</style>