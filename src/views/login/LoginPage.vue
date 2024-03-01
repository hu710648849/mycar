<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/utils/request'
import { ethers } from 'ethers'
import { addressLoginStore } from '@/stores'

const isRegister = ref(false)
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  userType: '',
  username: '',
  userAddress: '',
  signature: '' // 新增字段用于存储签名
})

const register = async () => {
  console.log('点击后注册部分开始啦')
  try {
    const response = await axios.post(
      'http://localhost:3000/user/register',
      formModel.value
    )
    console.log(response.data) // 输出响应数据
    ElMessage.success('注册成功')
    isRegister.value = false
  } catch (error) {
    console.error(error) // 打印错误信息
    ElMessage.error('注册失败')
  }
}

const router = useRouter()
const login = async () => {
  try {
    const userAddress = formModel.value.userAddress
    const loginUsername = formModel.value.username // 获取登录时输入的用户名

    const res = await axios.post(
      // 此处修改为调用 getUserInfo 接口
      'http://localhost:3000/user/getUserInfo',
      { userAddress: userAddress }
      // formModel.value
    )

    // 进行用户名匹配判断
    if (loginUsername !== res.userInfo[1]) {
      ElMessage.error('用户名与该账号不匹配')
      return
    }

    if (window.ethereum) {
      // console.log(ethers.providers)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signature = await signer.signMessage(userAddress)
      formModel.value.signature = signature
    }
    console.log(res)
    // 调用登录接口
    const response = await axios.post(
      'http://localhost:3000/user/login',
      formModel.value
    )
    // console.log(response.data) // 输出响应数据
    ElMessage.success(response)
    // 获取当前账户地址
    const accountAddress = addressLoginStore()
    accountAddress.setAddress(formModel.value.userAddress)
    router.push('/')
  } catch (error) {
    console.error(error) // 打印错误信息
    ElMessage.error('登录失败')
  }
}

// 切换的时候，重置表单内容
watch(isRegister, () => {
  formModel.value = {
    userType: '',
    username: '',
    userAddress: '',
    signature: '' // 重置时也清空签名
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="18" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form
        :model="formModel"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="userType">
          <el-input
            v-model="formModel.userType"
            :prefix-icon="User"
            placeholder="请输入0或者1乘客或司机"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userAddress">
          <el-input
            v-model="formModel.userAddress"
            :prefix-icon="User"
            placeholder="请输入metamask地址"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录相关表单 -->
      <el-form
        :model="formModel"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userAddress">
          <el-input
            v-model="formModel.userAddress"
            name="userAddress"
            :prefix-icon="Lock"
            type="text"
            placeholder="请输入metamask地址"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
