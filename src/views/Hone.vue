<script setup lang="ts">
    import TimeLine from "../components/Timeline.vue";
</script>

<template>
    <Suspense>
        <template #default>
            <TimeLine />
        </template>

        <template #fallback>
            <progress class="progress is-primary is-small" />
        </template>
    </Suspense>
</template>

<style scoped>
</style>
