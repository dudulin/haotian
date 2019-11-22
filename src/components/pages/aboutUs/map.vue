<template>
    <div class="amap-page-container">
      <el-amap :vid="vid" :zoom="zoom" :center="position" class="amap-demo" :mapStyle="mapStyle">
        <el-amap-marker :vid="vid+'-marker'" :position="position"></el-amap-marker>
      </el-amap>
    </div>
  </template>

  <style>
  .amap-page-container {
    width: 100%;
    height: 100%;
  }
  </style>

  <script>
    module.exports = {
      name: 'amap-page',
      props: ['vid', 'position'],
      data() {
        return {
          zoom: 14,
          mapStyle: 'normal'
        }
      }
    }
</script>
