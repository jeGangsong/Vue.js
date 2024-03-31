<script setup>
import { ref } from "vue";
import { useCommonStore } from "@/stores/common";
import { useRouter } from "vue-router";
import { api } from "@/utils/axios";

const DOMAIN = import.meta.env.VITE_APP_SERVER_URL;

const router = useRouter();

const common = useCommonStore();
const orders = ref([]);

async function getOrders() {
  const result = await api.orders.findAll();
  console.log(result);
  orders.value = result.data;
}
function setImage(image_src) {
  return `${DOMAIN}/${image_src}`;
}

function moveDetail(id) {
  router.push({
    name: "order-detail",
    params: { id: id },
  });
}

common.changeTitle("주문 목록");
getOrders();
</script>

<template>
  <ul>
    <li
      v-for="order in orders"
      :key="order.id"
      @click="moveDetail(order.id)"
    >
      <div class="order-container">
        <div
          class="order-image"
          :style="`background-image:
          url(${setImage(order.image_src)})`"
        >
        </div>
        <div class="order-info-wrapper">
          <h2 class="order-name">{{ order.name }}</h2>
          <p> {{  order.quantity }} 개 주문 </p>
          <p class="order-description">요청사항 : {{ order.request_detail }}</p>          
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.order-container {
  display: flex;
  align-items: center;
  border-bottom: 3px solid black;
}

.order-info-wrapper {
  margin: 0 auto;
  text-align: center;
}

.order-name {
  font-size: 25px;
  font-weight: bold;
}

.order-description {
  padding-top: 10px;
}

.order-image {
  background-size: cover;
  background-position: center;
  width: 180px;
  height: 180px;
}
</style>
