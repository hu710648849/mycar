import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ userType, username, userAddress }) =>
  request.post('/user/register', { userType, username, userAddress })

// 登录接口
export const userLoginService = ({ username, userAddress }) =>
  request.post('/user/login', { username, userAddress })

// // 获取用户基本信息
// export const userGetInfoService = () => request.get('/my/userinfo')
