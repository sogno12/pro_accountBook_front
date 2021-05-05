<template>
    <div>
        <!-- Subject -->
        <up-subject></up-subject>
        <!-- 역할 목록 -->
        <up-role-list></up-role-list>
    </div>
</template>

<script>
import UpRoleList from '@/components/system/roles/UpRoleList.vue'
    export default {
        components: {
            UpRoleList,
        }        
    }
</script>

<style lang="scss" scoped>

</style>