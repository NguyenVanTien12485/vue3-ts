<script setup lang="ts">
import { TimelinePost } from '../posts'
defineProps<{
    post: TimelinePost
}>()
</script>

<template>
    <a href="" class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
        <a href="">{{ post.title }}</a>
        <div>{{ post.created.toFormat('d MMM') }}</div>
    </a>
</template>

<style>
</style>