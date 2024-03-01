<template>
  <div class="driver-details">
    <h1>{{ driver.name }}</h1>
    <p>评价：{{ driver.rating }}/5.0</p>
    <p>车型：{{ driver.carType }}</p>
    <button @click="contactDriver">联系司机</button>
    <button @click="confirmTrip">确认行程</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const driver = ref({
  name: '张师傅',
  rating: 4.8,
  carType: '奥迪A6'
  //其他司机信息
})

function contactDriver() {
  //联系司机的逻辑
}

function confirmTrip() {
  //确认行程的逻辑
}
</script>
