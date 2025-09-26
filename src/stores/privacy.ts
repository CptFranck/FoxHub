import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Privacy } from '@/class/PrivacyEnum.ts'

export const usePrivacyStore = defineStore('privacy', () => {
  const privacy = ref(Privacy.PERSONAL)

  function toggle() {
      console.log(privacy.value )
    if(privacy.value === Privacy.PERSONAL) {
      privacy.value = Privacy.PUBLIC
    }
    else privacy.value = Privacy.PERSONAL
  }

  return { privacy, toggle }
})

