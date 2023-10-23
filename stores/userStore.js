import { defineStore } from "pinia"

export const userStore = defineStore('user', {
    state: () => ({
        register: { }
    }),
    getters: {
      getRegister: (state) => state.register
    },
    actions: {
      setRegister(data) {
        state.register = data
      }
    },
  })