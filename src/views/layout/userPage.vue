<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { addressLoginStore } from '@/stores'
import { useRouter } from 'vue-router'

// 响应式变量
const username = ref('')
const avatarUrl = ref('https://randomuser.me/api/portraits/men/1.jpg')
const userAddress = ref('')
const accountBalance = ref('')
const userInfo = ref([]) // 定义响应式的 userInfo 数组

// 在组件挂载后发送请求获取用户信息
onMounted(async () => {
  try {
    const addressStore = addressLoginStore()
    const res = await axios.post('http://localhost:3000/user/getUserInfo', {
      userAddress: addressStore.address
    })

    userInfo.value = res.data.userInfo // 更新 userInfo 的值
    const balance = res.data.balance

    // 更新响应式变量的值
    username.value = userInfo.value[1]
    userAddress.value = userInfo.value[2]
    accountBalance.value = balance
  } catch (error) {
    console.error(error)
  }
})

const router = useRouter()
const outLogin = () => {
  ElMessageBox.confirm('你确认退出登录吗?', '注意', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      clearAddressInPinia() // 在确认退出登录后清除 Pinia 中的账户地址信息
      ElMessage({
        type: 'success',
        message: '退出登录成功！'
      }),
        router.push('/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '退出登录失败'
      })
    })
}

function clearAddressInPinia() {
  const addressStore = addressLoginStore()
  addressStore.address = null
}
</script>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faMedal,
  faShoppingBag,
  faShoppingCart,
  faGift,
  faCreditCard,
  faCar,
  faTaxi,
  faBus,
  faTrain
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faMedal,
  faShoppingBag,
  faShoppingCart,
  faGift,
  faCreditCard,
  faCar,
  faTaxi,
  faBus,
  faTrain
)

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>

<template>
  <div class="my-page">
    <!-- 上部分 -->
    <div class="header">
      <div class="profile-section">
        <img class="avatar" :src="avatarUrl" alt="Avatar" />
        <div class="userInfo">
          <h3 class="username">{{ username }}</h3>
          <p v-if="userInfo[0] === '0'">用户类型：<span>乘客</span></p>
          <p v-else-if="userInfo[0] === '1'">用户类型：<span>司机</span></p>
          <el-button
            @click="outLogin"
            type="info"
            plain
            style="margin-left: 15px"
            >退出登录</el-button
          >
        </div>
      </div>
      <div class="icons-section">
        <div>
          <p>
            账户地址: <span>{{ userAddress }}</span>
          </p>
          <p>
            账户余额: <span>{{ accountBalance }} Wei</span>
          </p>
          <p>
            ETH余额:
            <span>{{ Math.round(Number(accountBalance) / 10 ** 18) }} ETH</span>
          </p>
        </div>
        <button class="sign-in-button">签到</button>
      </div>
      <div class="actions-section">
        <div class="activity-container">
          <div class="activity-content">
            <h3 class="activity-title">新年活动</h3>
            <p class="activity-description">龙年大吉,右键点击领取红包</p>
          </div>
          <button class="claim-button">领取</button>
        </div>
      </div>
      <div class="bottom-icons">
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="shopping-cart" />
          <span class="icon-label">我的订单</span>
        </div>
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="credit-card" />
          <span class="icon-label">剩余Eth</span>
        </div>
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="gift" />
          <span class="icon-label">福利中心</span>
        </div>
      </div>
    </div>
    <!-- 下部分 -->
    <div class="bottom-section">
      <div class="left-panel">
        <div class="data-panel">
          <h3 class="panel-title">总里程:</h3>
          <p class="panel-description">334km</p>
        </div>
        <div class="membership-panel">
          <h3 class="panel-title">卡路里:</h3>
          <p class="panel-description">8888.8千卡</p>
        </div>
      </div>
      <div class="ride-icons">
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="car" />
          <span class="icon-label">公交车</span>
        </div>
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="taxi" />
          <span class="icon-label">出租车</span>
        </div>
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="bus" />
          <span class="icon-label">自行车</span>
        </div>
        <div class="icon-container">
          <font-awesome-icon class="icon" icon="train" />
          <span class="icon-label">小电动</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.userInfo p span {
  color: #f06b6b;
}
.icons-section span {
  font-size: 12px; /* 设置字体大小为 14px，您可以根据需要进行调整 */
}
.userInfo p {
  margin-left: 20px;
  margin-top: -20px;
}

.icons-section p {
  margin: 5px;
}

.my-page {
  background: linear-gradient(to bottom, #e2dcdc, #f5f5f5);
  padding: 3px;
}

.header {
  background-color: #f5f5f5;
  padding: 10px;
  color: #2d2626;
}

.profile-section {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.username {
  margin-left: 20px;
  font-size: 24px;
}

.icons-section {
  display: flex;
  background-color: #ffffff;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
  margin-top: 20px;
}

.icon-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.icon-label {
  margin-left: 5px;
}

.sign-in-button {
  background-color: #ffffff;
  color: #f06b6b;
  border: none;
  padding: 10px 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.actions-section {
  margin-top: 20px;
}

.activity-container {
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-title {
  margin: 0;
  font-size: 18px;
}

.activity-description {
  margin: 0;
}

.claim-button {
  background-color: #9a7b7b;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.bottom-icons {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-top: 20px;
}

.bottom-section {
  display: flex;
  padding: 7px;
  margin-top: 20px;
}

.left-panel {
  background-color: #ffffff;
  width: 200px;
  padding: 20px;
}

.data-panel,
.membership-panel {
  text-align: center;
}

.panel-title {
  margin: 0;
  margin-top: 12px;
  font-size: 18px;
}

.panel-description {
  margin: 0;
}

.ride-icons {
  display: flex;
  background-color: #ffffff;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.icon-label {
  margin-top: 10px;
  font-size: 14px;
}
</style>
