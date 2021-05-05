<template>
    <div>
        <!-- Subject -->
        <up-subject></up-subject>
        <!-- 모듈 목록 -->
        <up-module-list></up-module-list>
    </div>
</template>

<script>
import UpModuleList from '@/components/system/modules/UpModuleList.vue'
    export default {
        components: {
            UpModuleList,
        }        
    }
</script>

<style lang="scss" scoped>

</style>