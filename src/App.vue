<script setup lang="ts">
import TimeLine from "./components/Timeline.vue";
</script>

<template>
  <div class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <TimeLine />
        </template>

        <template #fallback>
          <progress class="progress is-primary is-small" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
