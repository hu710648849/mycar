<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
// 拿地址
import { addressLoginStore } from '@/stores'
import axios from 'axios'
import { ref } from 'vue'

const theId = ref('')

const confirmComplete = () => {
  ElMessageBox.prompt('请输入该订单的订单号', '注意', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^\d{1,3}$/,
    inputErrorMessage: '1-3位的任意数字订单号'
  })
    .then(({ value }) => {
      // 此处进行点击确认成功后的操作 调接口等等 可以调用一个函数在外部编写function
      confirmArrive(value)
      theId.value = value
      ElMessage({
        type: 'success',
        message: `成功确认你的订单号是:${value}`
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '确认失败'
      })
    })
}

async function confirmArrive(value) {
  const addressStore = addressLoginStore()
  console.log(addressStore.address) // 登陆的账户地址从pinia中获取
  try {
    const addressStore = addressLoginStore()
    console.log(addressStore.address)
    const res = await axios.post(
      `http://localhost:3000/ride/completeRide/${value}`,
      {
        accountAddress: addressStore.address
      }
    )
    console.log(res.data)

    if (res.data.includes('Ride completed')) {
      ElMessage({
        type: 'success',
        message: `该订单状态成功变更为completed`
      })
    } else {
      ElMessage({
        type: 'info',
        message: `订单接口数据有误`
      })
    }
  } catch (error) {
    console.error(error)
  }
}

// 支付部分
const payMoney = ref('') // 最后确认输入支付的金额

async function confirmPay() {
  const addressStore = addressLoginStore()
  console.log(addressStore.address)
  const res = await axios.post(
    `http://localhost:3000/ride/confirmPayment/${theId.value}`,
    {
      accountAddress: addressStore.address,
      actualFareInEth: payMoney.value
    }
  )
  console.log(res.data)
  ElMessage({
    type: 'success',
    message: '支付成功，司机已经接收转账！'
  })
}
</script>

<template>
  <xiaohuHeader></xiaohuHeader>
  <div class="complete">
    <p>注意：</p>
    <p>
      如果您已到达目的地终点~~~~~~,现在请点击确认，订单状态将变更为已完成(completed)
      <el-button @click="confirmComplete" type="info" plain style="float: right"
        >确认</el-button
      >
    </p>
    <hr />

    <div class="pay">
      <p>div支付部分</p>
      <div>
        <el-form-item prop="username">
          支付金额：<el-input
            v-model="payMoney"
            placeholder="请输入支付金额"
          ></el-input>
        </el-form-item>
      </div>
      <el-button @click="confirmPay" type="info" plain style="float: right"
        >确认</el-button
      >
    </div>
  </div>
</template>
