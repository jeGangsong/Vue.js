<script setup>
import { ref } from "vue";
import { useCommonStore } from "@/stores/common";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/utils/axios";

const route = useRoute();
const router = useRouter();

const count = ref(0);
const name = ref("");
const description = ref("");
const file = ref(null);
const common = useCommonStore();
const selection = ref();
const menuList = ref([]);
const request = ref("");

function fileChange(e) {
  file.value = e.target.files[0];
}

// create: (menus_id, quantity, request_detail) =>
// 			request.post(`/orders`, {
// 				menus_id,
// 				quantity,
// 				request_detail,
// 			}),

async function orderCreate() {
  if (!selection.value || !count.value || !request.value) {
    alert("빈 값이 있습니다. 내용을 전부 작성해주세요.");
  }
  const result = await api.orders.create(
    selection.value,
    count.value,
    request.value
  );
  // 요청 성공
  if (result.data.success) {
    alert(result.data.message);
    router.push({ name: "orders" });
  }
  // 요청 실패
  if (!result.data.success) {
    alert(result.data.message);
  }
}
async function orderUpdate() {
  const result = await api.orders.update(
    route.params.id,
    selection.value,
    count.value,
    request.value
  );
  console.log(result);
  alert(result.data.message);
  router.push({
    name: "order-detail",
    params: { id: result.id },
  });
}

function setURL(file) {
  const imageURL = URL.createObjectURL(file);
  return imageURL;
}

async function getMenu(){
  const result = await api.menus.findAll();
  menuList.value = result.data;
}

async function getorders() {
  const result = await api.orders.findOne(route.params.id);
  name.value = result.data.name;
  request.value = result.data.request_detail;
  console.log(name.value);
}
afdsfsdadf();

async function afdsfsdadf(){
  await getMenu();
if (route.params.id) {
  
  await getorders();

  common.changeTitle("주문 수정하기");

  const ob = menuList.value.find((el)=>{
    return el.name == name.value;
  })

  console.log(ob);

  selection.value = ob.id;

  
} else {
  common.changeTitle("주문하기");
}
}



</script>

<template>
  <div class="form-wrapper">
    <div>
      <span>메뉴 선택: </span>

      <select v-model="selection"  name="menu.id">
        <option v-for="menu in menuList" :value="menu.id" >{{ menu.name }}</option>
      </select>

      <span class="count-Box"> {{ count }} 개 </span>
      <button class="count-btn" @click="count++">+</button>
      <button class="count-btn" @click="count--">-</button>
    </div>
    <div>
      <span>요청 사항: </span>
      <input type="text" v-model="request" />
    </div>
    <div v-if="route.params.id">
      <button @click="orderUpdate">주문 수정하기</button>
    </div>
    <div v-else>
      <button @click="orderCreate">주문 하기</button>
    </div>
  </div>
  <div class="image-wrapper" v-if="file">
    <img class="selected-image" :src="setURL(file)" />
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 1px solid black;
  padding: 20px;
}

.form-wrapper>* {
  margin: 10px;
}

.image-wrapper {
  margin-top: 30px;
  border: 1px solid black;
}

.selected-image {
  width: 100%;
}

.count-Box {
  margin: 30px;
}

.count-btn {
  margin: 5px;
}
</style>
