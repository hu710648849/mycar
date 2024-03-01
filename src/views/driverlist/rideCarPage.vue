<template>
  <div class="dache">
    <!-- 顶部吸顶 -->
    <xiaohuHeader></xiaohuHeader>
    <div class="dacheinfo">
      <div class="left-input">
        <span>起点：</span>
        <el-input v-model="startPoint" class="mystart-point"></el-input>
      </div>
      <div class="right-input">
        <span>预存：</span>
        <el-input
          v-model="money"
          class="money-input"
          placeholder="eth"
        ></el-input>
      </div>
    </div>
    <div class="top-bar">
      <div class="start-point">
        {{ myaddress }}<el-icon><CaretBottom /></el-icon>
      </div>
      <el-input
        v-model="endPoint"
        class="end-point"
        placeholder="你要去哪儿"
      ></el-input>
      <el-button type="primary" plain @click="requestRide">打车</el-button>
    </div>

    <!-- 中间内容区域 -->
    <div class="content-area">
      <div class="row">
        <div class="column">
          <el-icon class="myicon"><House /></el-icon>
          <div class="text-container">
            <p>家</p>
            <p>设置地址</p>
          </div>
        </div>

        <div class="column">
          <el-icon class="myicon"><OfficeBuilding /></el-icon>
          <div class="text-container">
            <p>公司</p>
            <p>设置地址</p>
          </div>
        </div>

        <div class="column">
          <el-icon class="myicon"><Star /></el-icon>
          <div class="text-container">
            <p>收藏</p>
            <p>设置地址</p>
          </div>
        </div>
      </div>
    </div>

    <div
      style="margin-top: 10px; height: 455px; width: 375px; position: relative"
    >
      <img
        v-if="previousLocations.length === 0"
        src="@/assets/empty.png"
        alt="没有搜索历史记录"
        class="center-image"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        "
      />
      <ul v-else>
        <li
          class="history-location"
          v-for="location in previousLocations"
          :key="location.id"
        >
          <el-icon class="myclock"><Clock /></el-icon>
          <div class="historytext">
            <p>{{ location.name }}</p>
            <p>{{ location.address }}</p>
            <hr />
          </div>
        </li>
      </ul>
      <el-button
        v-if="previousLocations.length > 0"
        type="danger"
        @click="clearSearchHistory"
        style="float: right"
        >清空历史记录</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { addressLoginStore } from '@/stores'

const myaddress = ref('萍乡市')
const startPoint = ref('')
const endPoint = ref('')
const money = ref('')
const previousLocations = ref([
  {
    id: 1,
    name: '江西软件大学',
    address: '江西省萍乡市湘东区先锋软件国际园区内'
  },
  {
    id: 2,
    name: '九江学院',
    address: '江西省九江市濂溪区前进路口'
  }
])

const clearSearchHistory = () => {
  previousLocations.value = []
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const startPointParam = urlParams.get('startPoint')
  if (startPointParam) {
    startPoint.value = startPointParam
  }
})

async function requestRide() {
  try {
    const addressStore = addressLoginStore()
    console.log(addressStore.address)

    const response = await axios.post(
      'http://localhost:3000/ride/requestRide',
      {
        accountAddress: addressStore.address,
        start: startPoint.value,
        end: endPoint.value,
        value: money.value,
        fare: money.value
      }
    )

    const rideId = response.data.match(/\d+/)[0]
    ElMessage.success('订单成功生成，订单号为' + rideId)

    // Add the new location to history
    previousLocations.value.unshift({
      id: previousLocations.value.length + 1,
      name: endPoint.value,
      address: 'Your custom address here'
    })

    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.historytext p:last-child {
  font-size: 12px;
  color: rgb(89, 83, 83);
}

.dacheinfo {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.left-input,
.right-input {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  margin-right: 20px; /* 可根据实际需求调整间距 */
}

.mystart-point {
  width: 179px; /* 调整起点输入框的宽度为 179px */
}

.money-input {
  width: 40px; /* 调整预存输入框的宽度为 40px */
}
.history-location {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.historytext {
  display: flex;
  flex-direction: column;
}

.column {
  display: flex;
  align-items: center;
}

.myclock {
  margin-right: 10px; /* 调整图标和文本之间的间距 */
}

.clock {
  margin-right: 10px;
}

.text-container {
  display: flex;
  flex-direction: column;
}
.text-container p:last-child {
  font-size: 12px;
  color: rgb(89, 83, 83);
}
.dache {
  padding: 10px;
}
.top-bar {
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}

.end-point {
  flex: 1;
  margin: 0 5px;
}

.row {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 10px;
}
</style>
