<template>
  <div>
    <h1>Page not found</h1>
    <NuxtLink to="/">
      Go back
    </NuxtLink>
    <div>
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
    error: {
        type: Object,
        default: () => {}
    }
})
</script>
