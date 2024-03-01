import axios from 'axios'
const baseURL = 'http://172.0.0.1:3000'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.response.use(
  (response) => {
    // 判断响应数据是否成功
    if (response.status === 200) {
      return response.data // 返回响应数据
    } else {
      // 显示错误提示
      ElMessage.error(response.data.error || '服务异常')
      return Promise.reject(response.data)
    }
  },
  (error) => {
    // 显示错误提示
    if (error.response) {
      ElMessage.error(error.response.data.error || '服务异常')
    } else {
      ElMessage.error('服务异常')
    }
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
