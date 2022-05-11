<template>
  <div id="app3">
    <img src="./assets/logo.png">
    <a href="#/Second">Second</a>
    <a href="#/Third">Third</a>
    <a href="#/othe">other</a>
    <router-view/>
    <router-view/>
  </div>
</template>

<script>
export default { // 暴露当前组件对象
  name: 'App' // 暴露组件的名称
}
</script>

<style>
#app3 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
