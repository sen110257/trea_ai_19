import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const show = ref(false)
  const message = ref('')
  const type = ref('success')

  function showToast(msg, t = 'success') {
    message.value = msg
    type.value = t
    show.value = true
  }

  function hide() {
    show.value = false
  }

  return {
    show,
    message,
    type,
    showToast,
    hide
  }
})
