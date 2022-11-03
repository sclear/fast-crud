<template>
  <Form ref="form" :createOption="createOption" />
  <Table
    ref="table"
    :createOption="tableOption"
    :search-params="createOption.data"
    class="mt20"
  />
  <Dialog title="用户信息新增" ref="dialog">
    <Form ref="modelForm" :createOption="modelOption" />
  </Dialog>
</template>

<script lang="tsx" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { ElButton, ElInput } from "element-plus";
import Table, { CreateTableOption } from "./../../components/Table";
import Form, { CreateFormOption } from "./../../components/Form/index";
import Dialog from "./../../components/Dialog";
import { useSetting } from "./../../store/setting";

const setting = useSetting();

const dialog = ref();
const form = ref();
const table = ref();
const modelForm = ref();

const createOption = CreateFormOption({
  disabled: ref(false),
  form: [
    {
      type: "Input",
      label: "姓名",
      model: "name",
      row: [8],
      vIf({ data }) {
        return data.phone === "0";
      },
      vDisabled({ data }) {
        return data.name === "1";
      },
      onChange(option) {},
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
      type: "Select",
      label: "性别",
      model: "sex",
      dataSource: [
        {
          value: 0,
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
      row: [8],
    },
    {
      label: "test",
      model: "test",
      row: [8],
      renderFormItem(text, data) {
        return <ElInput v-model={data.value.test}></ElInput>;
      },
    },
    {
      row: [6, 18],
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
    new: "123",
  }),
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
  api: ref("createUser"),
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
      render(text, data, index) {
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
