<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Toast from './components/Toast.vue'
import { useToastStore } from './stores/toast'

const route = useRoute()
const toastStore = useToastStore()

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

watch(() => toastStore.show, (newVal) => {
  if (newVal) {
    toast.value = {
      show: true,
      message: toastStore.message,
      type: toastStore.type
    }
    setTimeout(() => {
      toastStore.hide()
    }, 3000)
  }
})

watch(() => route.path, () => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.main-content {
  padding-top: 80px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 70px;
  }
}
</style>
