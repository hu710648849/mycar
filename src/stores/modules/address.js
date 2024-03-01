import { defineStore } from 'pinia'
import { ref } from 'vue'

export const addressLoginStore = defineStore(
  'address-login',
  () => {
    const address = ref('')

    const setAddress = (newAddress) => {
      address.value = newAddress
    }

    return {
      address,
      setAddress
    }
  },
  {
    persist: true
  }
)
