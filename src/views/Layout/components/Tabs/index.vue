<template>
  <el-tabs
    :modelValue="currentPath"
    type="card"
    class="demo-tabs"
    closable
    @tab-click="tabChange"
    @tabRemove="setting.removeTab"
  >
    <el-tab-pane
      v-for="item in setting.tabs"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { ElButton, ElTabs, ElTabPane } from "element-plus";
import { useSetting } from "@/store/setting";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const setting = useSetting();

const currentPath = computed(() => {
  return setting.tabs.find(
    (item) =>
      item.name === setting.currentTab && item.title === route.meta.title
  )?.path;
});

function tabChange(pane: any) {
  const routeInfo = setting.tabs.find((item) => item.path === pane.props.name);

  if (routeInfo?.path === route.path) {
    return;
  }

  router.push({
    path: routeInfo?.path,
    query: routeInfo?.query,
  });
}
</script>

<style lang="less">
.el-tabs__header {
  margin: 0;
}
</style>
