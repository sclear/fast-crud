<template>
  <div class="page-container">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.page-container {
  box-sizing: border-box;
  height: calc(100% - 41px);
  padding: 15px 15px 0 15px;
  overflow-x: auto;
}
</style>
