import { defineStore } from 'pinia'
import { ref } from 'vue'

export const startPointStore = defineStore(
  'start-point',
  () => {
    const start = ref('')

    const setStartPoint = (newStart) => {
      start.value = newStart
    }

    return {
      start,
      setStartPoint
    }
  },
  {
    persist: true
  }
)
