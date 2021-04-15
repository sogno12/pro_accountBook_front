<template>
    <div>
        <!-- Subject -->
        <up-subject></up-subject>
        <!-- 사용자 목록 -->
        <up-user-list></up-user-list>
    </div>
</template>

<script>
import UpUserList from '@/components/admin/users/UpUserList.vue'
    export default {
        components: {
            UpUserList,
        }        
    }
</script>

<style lang="scss" scoped>

</style>