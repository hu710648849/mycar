<template>
  <div>
    <xiaohuHeader></xiaohuHeader>
    <div v-for="(order, index) in orders" :key="order.passenger">
      <div class="order-item">
        <div>订单号: {{ orderIds[index] }}</div>
        <div>
          用户账号: <span style="font-size: 12px">{{ order.passenger }}</span>
        </div>
        <div>起点: {{ order.startLocation }}</div>
        <div>终点: {{ order.endLocation }}</div>
        <div style="">
          预支付金额:
          <span style="color: #ee0a24">{{ order.estimatedFare }} ETH</span>
        </div>
        <div>
          订单状态:
          {{
            order.status === '0'
              ? '已请求(Requested)'
              : order.status === '1'
                ? '已接受(Accepted)'
                : order.status === '2'
                  ? '已完成(Completed)'
                  : '已取消(Canceled)'
          }}
        </div>
        <div>支付状态: {{ order.paid ? 'Paid' : 'Unpaid' }}</div>
        <button @click="acceptRide(orderIds[index])">接单</button>
        <button @click="cancelRide(order.passenger)">取消订单</button>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { addressLoginStore } from '@/stores'

const orders = ref([])
const orderIds = ref([])

onMounted(async () => {
  try {
    // const orderIds = []
    const addressStore = addressLoginStore()
    const res1 = await axios.post(
      'http://localhost:3000/ride/getRequestedRideIds',
      { accountAddres: addressStore }
    )
    console.log(res1.data) // [1]所有订单数据
    // orderIds.value.push(...res.data)
    Array.prototype.push.apply(orderIds.value, res1.data.rideIDs) // 将 rideIDs 数组合并到 orderIds.value 中
    // const orderIds = [1, 2, 3] // 假设这里存储了所有订单编号的数组
    console.log(orderIds.value)
    for (const orderId of orderIds.value) {
      const res2 = await axios.get(
        `http://localhost:3000/ride/getRideRequest/${orderId}`
      )
      const orderData = res2.data
      console.log(orderData) // 输出订单数据，检查是否正确获取
      orders.value.push(orderData)
    }
  } catch (error) {
    console.error(error)
  }
})

const acceptRide = async (orderId) => {
  try {
    const addressStore = addressLoginStore()
    console.log(addressStore.address)
    const res3 = await axios.post(
      `http://localhost:3000/ride/acceptRide/${orderId}`,
      { accountAddress: addressStore.address }
    )
    console.log(res3)
    if (res3.data.includes('Ride accepted')) {
      console.log('Ride accepted. Transaction hash:', res3.data)
      ElMessage.success(`接单${orderId}成功`)
      // 这里可以根据后端返回的数据进行界面上的更新操作，比如修改订单状态等
    } else {
      console.error('Failed to accept ride. Response:', res3.data)
    }
  } catch (error) {
    console.error('Failed to accept order:', error)
  }
}
</script>

<style></style>
