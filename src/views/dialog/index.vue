<script lang="tsx" setup>
import { ref } from "vue";
import { ElButton } from "element-plus";
import Dialog from "@/components/Dialog";

const dialogRef = ref();

const openDialog = () => {
  dialogRef.value.open();
};
</script>

<template>
  <Dialog :width="900" ref="dialogRef"> hello I'm sclear </Dialog>
  <ElButton @click="openDialog">open</ElButton>
</template>
