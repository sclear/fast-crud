<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tabRemove="removeTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElButton, ElTabs, ElTabPane } from "element-plus";

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

watch(
  () => editableTabsValue.value,
  (newTab: string) => {
    console.log(newTab);
  }
);

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
