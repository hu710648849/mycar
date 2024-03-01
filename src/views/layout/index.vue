<template>
  <div class="app-container">
    <!-- 路由内容展示区域 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="bottom-nav"
      mode="horizontal"
      background-color="#FFF"
      text-color="#000"
      active-text-color="#ee0a24"
    >
      <el-menu-item index="/layout/home">
        <router-link to="/layout/home">
          <i class="fas fa-home"></i>
          首页
        </router-link>
      </el-menu-item>
      <el-menu-item index="/layout/category">
        <router-link to="/layout/category">
          <i class="fas fa-th"></i>
          订单
        </router-link>
      </el-menu-item>
      <el-menu-item index="/layout/pay">
        <router-link to="/layout/pay">
          <i class="fas fa-shopping-cart"></i>
          支付
        </router-link>
      </el-menu-item>
      <el-menu-item index="/layout/user">
        <router-link to="/layout/user">
          <i class="fas fa-user"></i>
          我的
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = ref(route.path)

watch(route, (newRoute) => {
  activeIndex.value = newRoute.path
})
</script>

<style scoped>
.router-link-active,
.router-link-exact-active,
.el-menu-item a {
  text-decoration: none; /* 移除文本下划线 */
  color: inherit; /* 可选：使链接颜色与父元素相同 */
}
.app-container {
  padding-bottom: 60px; /* 确保内容不会被底部导航栏遮挡 */
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border: none;
  display: flex;
  justify-content: space-around;
  background-color: #f8f8f8; /* 更改底部导航栏背景色 */
}

.el-menu--horizontal > .el-menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.el-menu-item .el-icon,
.el-menu-item .fas {
  margin-bottom: 4px;
}

/* 新增激活样式 */
.el-menu-item.is-active a,
.el-menu-item.is-active i {
  color: #ee0a24; /* 激活项的文字和图标颜色 */
}

/* 移除默认的Element Plus激活背景色 */
.el-menu-item.is-active {
  background-color: transparent !important; /* 使用transparent去除背景色 */
}

/* 可选：为激活的菜单项添加边框或阴影效果 */
.el-menu-item.is-active {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 示例阴影效果 */
  border-radius: 10px; /* 圆角效果 */
}
</style>
