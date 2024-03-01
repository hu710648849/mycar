<template>
  <div>
    <h1>附近司机列表</h1>
    <ul>
      <li v-for="driver in drivers" :key="driver.id">
        <img :src="driver.avatar" alt="司机头像" />
        <div>
          <p>{{ driver.name }}</p>
          <p>{{ driver.vehicle }}</p>
          <p>距离: {{ driver.distance }}米</p>
        </div>
        <button @click="selectDriver(driver)">选择司机</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const drivers = ref([
      {
        id: 1,
        avatar: '司机头像1的URL',
        name: '司机1',
        vehicle: '车辆信息1',
        distance: 500
      },
      {
        id: 2,
        avatar: '司机头像2的URL',
        name: '司机2',
        vehicle: '车辆信息2',
        distance: 1000
      },
      {
        id: 3,
        avatar: '司机头像3的URL',
        name: '司机3',
        vehicle: '车辆信息3',
        distance: 1500
      }
    ])

    const selectDriver = (driver) => {
      // 处理选择司机的逻辑，比如发送请求等
      console.log('选择了司机', driver)
    }

    return {
      drivers,
      selectDriver
    }
  }
}
</script>

<style>
li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
button {
  margin-left: 10px;
}
</style>
