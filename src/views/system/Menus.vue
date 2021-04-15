<template>
    <div>
        <!-- Subject -->
        <up-subject></up-subject>
        <!-- 메뉴 목록 -->
        <up-menu-list></up-menu-list>
    </div>
</template>

<script>
import UpSubject from '@/components/base/UpSubject.vue'
import UpMenuList from '@/components/admin/menus/UpMenuList.vue'
    export default {
        components: {
            UpSubject,
            UpMenuList,
        }        
    }
</script>

<style lang="scss" scoped>

</style>