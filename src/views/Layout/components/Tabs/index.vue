<template>
  <el-tabs
    :modelValue="setting.currentTab"
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
import { ref, watch } from "vue";
import { ElButton, ElTabs, ElTabPane } from "element-plus";
import { useSetting } from "@/store/setting";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const setting = useSetting();

let tabIndex = 2;
const editableTabsValue = ref("2");
const editableTabs = ref([
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
]);

function tabChange(pane) {
  if (pane.props.name === route.path) {
    return;
  }

  const routeInfo = setting.tabs.find((item) => item.path === pane.props.name);
  console.log(routeInfo);
  router.push({
    path: routeInfo?.path,
    query: routeInfo?.query,
  });

  // const routes = setting.tabs.find((item) => item.path === path);
  // router.push({
  //   path: path,
  // });
}

const addTab = (targetName: string, newTitle: string) => {
  // 检测重复
  const isRepetition = editableTabs.value.some((tab) => tab.title === newTitle);
  if (isRepetition) return;
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: newTitle,
    name: newTabName,
    content: "New Tab content",
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName: string) => {
  // 检测禁删最后一项
  if (editableTabs.value.length === 1) return;
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
<style lang="less">
.el-tabs__header {
  margin: 0;
}
</style>
