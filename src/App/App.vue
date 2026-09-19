<script setup>
import { RouterView } from 'vue-router'
import NavBar from '../components/NavBar/NavBar.vue'
import SiteFooter from '../components/SiteFooter/SiteFooter.vue'
</script>

<template>
  <div class="app-shell">
    <NavBar />

    <main>
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  min-width: 0;
}

main {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
}
</style>
