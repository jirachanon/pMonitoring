import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"

export const userStore = defineStore('user', () => {
    const user = useLocalStorage('users', {})

    function setRegister (data) {
        user.value = data
    }

    return {user, setRegister}
  })