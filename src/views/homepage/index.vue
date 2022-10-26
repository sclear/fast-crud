<template>
  <Form ref="form" :createOption="createOption" />
  <Table ref="table" :createOption="tableOption" class="mt20" />
  <Dialog title="用户信息新增" ref="dialog">
    <Form ref="modelForm" :createOption="modelOption" />
  </Dialog>
</template>

<script lang="tsx" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { ElButton } from "element-plus";
import Table, { CreateTableOption } from "./../../components/Table";
import Form, { CreateFormOption } from "./../../components/Form/index";
import Dialog from "./../../components/Dialog";

const dialog = ref();
const form = ref();
const table = ref();
const modelForm = ref();

const createOption = CreateFormOption({
  form: [
    {
      type: "Input",
      label: "姓名",
      model: "name",
      row: [8],
      vIf({ data }: any) {
        return data.phone !== "12345";
      },
      onChange(option) {
        if (option.value === "4") {
          option.phone = "3434";
        }
      },
    },
    {
      type: "Input",
      label: "电话号码",
      model: "phone",
      row: [8],
    },
    {
      type: "Input",
      label: "身份证号",
      model: "idCard",
      row: [8],
    },
    {
      row: [4, 20],
      render() {
        return (
          <>
            <ElButton
              type="primary"
              onClick={() => {
                dialog.value.open();
              }}
            >
              新增
            </ElButton>
            <ElButton
              type="info"
              onClick={() => {
                form.value.reset();
                table.value.run();
              }}
            >
              重置
            </ElButton>
            <ElButton
              type="success"
              onClick={() => {
                table.value.run();
              }}
            >
              查询
            </ElButton>
          </>
        );
      },
    },
  ],
  data: ref({
    name: "",
    age: "",
    xz: "",
    birth: "",
  }),
  hiddenFields: ref<string[]>([]),
  labelWidth: 80,
});

const modelOption = CreateFormOption({
  form: [
    {
      type: "Input",
      label: "姓名",
      model: "name",
      row: [12],
    },
    {
      type: "DatePicker",
      label: "出生日期",
      row: [12],
      model: "birth",
    },
    {
      type: "Input",
      label: "年龄",
      row: [12],
      model: "age",
    },
    {
      type: "Input",
      label: "星座",
      row: [12],
      model: "xz",
    },
  ],
  api: "createUser",
  hiddenFields: ref([]),
  labelWidth: 120,
  data: ref({
    name: "",
    age: "",
    xz: "",
    birth: "",
  }),
  createRule(create) {
    return {
      name: create.must().rules,
      birth: create.must().rules,
      age: create.must().rules,
      xz: create.must().rules,
    };
  },
  onSuccess(done) {
    done();
    ElMessage({
      message: "新增成功",
      type: "success",
    });
  },
});

const tableOption = CreateTableOption({
  api: "list",
  column: [
    {
      label: "序号",
      render(text, data, index) {
        return index + 1;
      },
    },
    {
      prop: "name",
      label: "姓名",
    },
    {
      prop: "birth",
      label: "出生日期",
    },
    {
      prop: "age",
      label: "年龄",
    },
    {
      prop: "xz",
      label: "星座",
    },
    {
      label: "操作",
      render(text: string) {
        return (
          <>
            <ElButton
              onClick={() => {
                dialog.value.open();
              }}
            >
              编辑
            </ElButton>
            <ElButton type="primary">详情</ElButton>
          </>
        );
      },
    },
  ],
});
</script>

<style lang="less" scoped>
.mt20 {
  margin-top: 20px;
}
</style>
