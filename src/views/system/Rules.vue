<template>
    <div>
        <!-- Subject -->
        <up-subject></up-subject>
        <!-- 권한 목록 -->
        <up-rule-list></up-rule-list>
    </div>
</template>

<script>
import UpRuleList from '@/components/system/rules/UpRuleList.vue'
    export default {
        components: {
            UpRuleList,
        }        
    }
</script>

<style lang="scss" scoped>

</style>