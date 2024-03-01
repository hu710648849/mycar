<template>
  <div class="map-container">
    <xiaohuHeader></xiaohuHeader>
    <div id="map" style="width: 100%; height: 70vh"></div>
    <div class="search-bar">
      起点：
      <input
        type="text"
        placeholder="当前位置"
        v-model.trim="startPoint"
        class="el-input"
        style="width: 230px"
        @blur="handleInputBlur"
      /><br />
      <button class="carButton" @click="handleCarButtonClick">打车GO</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const mapInstance = ref(null)
const startPoint = ref('')
const router = useRouter()

onMounted(() => {
  loadMap()
})

function loadMap() {
  const AK = '6ECDhTquqpxdFNROei8cwF8Cq8Bf6dFf' // 请替换成您自己的百度地图AK
  const script = document.createElement('script')
  script.src = `https://api.map.baidu.com/api?v=3.0&ak=${AK}&callback=initMap`
  script.async = true
  script.defer = false
  script.onerror = () => {
    console.error('百度地图 API 加载失败')
  }
  document.body.appendChild(script)
}

window.initMap = () => {
  const BMap = window.BMap
  if (!BMap) {
    console.error('百度地图 API 加载失败')
    return
  }

  const map = new BMap.Map('map')
  map.enableScrollWheelZoom(true)
  map.enableDragging()
  mapInstance.value = map

  map.addEventListener('click', function (e) {
    const pt = e.point
    const geoc = new BMap.Geocoder()
    geoc.getLocation(pt, function (rs) {
      if (rs && rs.address && rs.addressComponents) {
        console.log('点击位置地址：', rs.address)
        startPoint.value = rs.address
        let marker = new BMap.Marker(pt)
        map.clearOverlays()
        map.addOverlay(marker)
      } else {
        console.error('无法获取有效的地址信息')
      }
    })
  })

  const geolocation = new BMap.Geolocation()
  geolocation.getCurrentPosition(function (r) {
    console.log('定位结果：', r)
    if (r && r.point) {
      const point = new BMap.Point(r.point.lng, r.point.lat)
      map.centerAndZoom(point, 18)

      let marker = new BMap.Marker(point)
      map.addOverlay(marker)

      const geoc = new BMap.Geocoder()
      geoc.getLocation(point, function (rs) {
        if (rs && rs.address && rs.addressComponents) {
          console.log('经度:', point.lng, '，纬度:', point.lat)
          startPoint.value = rs.address
        } else {
          console.error('无法获取有效的地址信息')
          startPoint.value = '未知位置'
        }
      })
    } else {
      console.error('定位失败：无效的位置信息')
      startPoint.value = '当前位置'
    }
  })
}

function handleInputBlur() {
  const BMap = window.BMap
  if (BMap) {
    const address = startPoint.value
    const geocoder = new BMap.Geocoder()
    geocoder.getPoint(
      address,
      function (point) {
        if (point) {
          mapInstance.value.panTo(point)
        } else {
          console.error('无法解析地址：', address)
        }
      },
      '北京市'
    )
  } else {
    console.error('BMap 对象未定义，请确保百度地图 API 已正确加载')
  }
}

function handleCarButtonClick() {
  router.push({ path: '/ridecar', query: { startPoint: startPoint.value } })
}
</script>

<style scoped>
.el-input {
  height: 35px;
}

.search-bar {
  position: relative;
}
.carButton {
  width: 65px;
  height: 35px;
  align-items: center;
  position: absolute;
}
.refreshButton {
  width: 90px;
  height: 35px;
  margin-left: 10px;
  align-items: center;
  position: absolute;
}
</style>
