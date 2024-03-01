<template>
  <div class="header-container">
    <button style="position: absolute; left: 15px" @click="$router.go(-1)">
      <el-icon><ArrowLeft /></el-icon>
    </button>
    <h1>小胡打车</h1>
  </div>
</template>

<script setup></script>

<style scoped>
.header-container {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center; /* 文字居中 */
  align-items: center;
  padding: 1px; /* 缩短高度 */
  background-color: #fff; /* 浅白色背景 */
  color: #333; /* 深灰色字体 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px; /* 细微的圆角 */
}

h1 {
  font-size: 22px; /* 调整字体大小 */
  font-weight: 600; /* 字重 */
  letter-spacing: 3px;
}
</style>
