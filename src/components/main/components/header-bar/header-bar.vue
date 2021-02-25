<template>
    <div class="header-bar">
        <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
       
    </div>
</template>

<script>
import customBreadCrumb from './custom-bread-crumb'
export default {
    name: 'HeaderBar',
    components: {
        customBreadCrumb
    },
    computed: {
        breadCrumbList () {
            debugger
            return this.$store.state.app.breadCrumbList
        }
    }
}
</script>

<style>

</style>