<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Second',
  data() {
    return {
      title: '第二个项目'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
