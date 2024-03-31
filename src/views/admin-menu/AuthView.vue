<script setup>
    import { ref } from "vue";
    import { useAuthStore } from "../../stores/auth";
    import { api } from "@/utils/axios";
    import {useRouter} from "vue-router";

    const router = useRouter();
    const password = ref();
    const token = ref(useAuthStore());

    async function check(){
        
        console.log(password.value);

        const flag = await api.auth.checkAuth(password.value);
        console.log(flag);
        if(flag.data.flag) {
            alert("성공");
            console.log(token.value.toggle);
            token.value.toggle();
            router.push({name : "menus-home"})
        }
        else{
            alert("실패");
        }
    }
    
</script>

<template>

    <h1>아무나 못들어가요~ </h1>
    <h1>비밀번호 입력하셈 ㅋㅋ</h1>
    <h2>처음 뚫으신 1분 에게 특급선물!!</h2>
    <input v-model="password" type="password"> 

    <button @click="check">확인</button>

</template>


<style scoped>

</style>