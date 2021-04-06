<template>
  <div class="main-content">
    <router-view/>
    <slot />
  </div>
</template>

<script>
export default {
name: "MainContent"
}
</script>

<style scoped>
</style>
