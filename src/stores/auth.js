import { defineStore } from 'pinia'
import {ref} from 'vue';

export const useAuthStore = defineStore('ss', () => {
   const flag=ref(false)

    function toggle() {
        flag.value = true;
    }

    return {flag, toggle};
});
