<template>
    <div>
        <!-- Subject -->
        <up-subject></up-subject>
        <!-- API 목록 -->
        <up-api-list></up-api-list>
    </div>
</template>

<script>
import UpApiList from '@/components/system/apis/UpApiList.vue'
    export default {
        components: {
            UpApiList,
        }        
    }
</script>

<style lang="scss" scoped>

</style>