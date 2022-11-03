<template>
  <ElMenu
    :default-active="setting.currentTab"
    :router="true"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <MenuItem :menus="setting.menus" />
  </ElMenu>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMenu } from "element-plus";
import MenuItem from "./menuItem";
import { useSetting } from "@/store/setting";

const setting = useSetting();

const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {};

const handleClose = (key: string, keyPath: string[]) => {};
</script>

<style lang="less">
.el-menu-vertical-demo {
  width: 200px;
  min-height: calc(100vh - 60px) !important;
}
</style>
