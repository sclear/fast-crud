<template>
  <ElMenu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <ElSubMenu index="1">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>Navigator One</span>
      </template>
      <ElMenuItemGroup>
        <template #title><span>Group One</span></template>
        <ElMenuItem index="1-1">item one</ElMenuItem>
        <ElMenuItem index="1-2">item two</ElMenuItem>
      </ElMenuItemGroup>
      <ElMenuItemGroup title="Group Two">
        <ElMenuItem index="1-3">item three</ElMenuItem>
      </ElMenuItemGroup>
      <ElSubMenu index="1-4">
        <template #title><span>item four</span></template>
        <ElMenuItem index="1-4-1">item one</ElMenuItem>
      </ElSubMenu>
    </ElSubMenu>
    <ElMenuItem index="2">
      <!-- <el-icon><icon-menu /></el-icon> -->
      <template #title>Navigator Two</template>
    </ElMenuItem>
    <ElMenuItem index="3" disabled>
      <!-- <el-icon><document /></el-icon> -->
      <template #title>Navigator Three</template>
    </ElMenuItem>
    <ElMenuItem index="4">
      <!-- <el-icon><setting /></el-icon> -->
      <template #title>Navigator Four</template>
    </ElMenuItem>
  </ElMenu>
</template>
<script lang="ts" setup>
import {
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
} from "element-plus";
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less">
.el-menu-vertical-demo {
  width: 200px;
  min-height: calc(100vh - 60px) !important;
}
</style>
