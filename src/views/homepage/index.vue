<template>
  <Form ref="searchFormRef" :createOption="searchForm" />
  <Table
    ref="tableRef"
    :createOption="tableOption"
    :search-params="searchForm.data"
    class="mt-2"
  />
  <Dialog :width="900" ref="dialogRef">
    <Form :createOption="dialogForm" />
  </Dialog>
</template>

<script lang="tsx" setup>
import { ElMessage, ElCard } from "element-plus";
import { ref } from "vue";
import { ElButton, ElInput } from "element-plus";
import Table, { CreateTableOption } from "./../../components/Table";
import Form, { CreateFormOption } from "./../../components/Form/index";
import Dialog from "./../../components/Dialog";

const dialogRef = ref();
const searchFormRef = ref();
const tableRef = ref();

const searchForm = CreateFormOption({
  form: [
    {
      type: "Input",
      label: "姓名",
      model: "name",
      row: [8],
      vDisabled({ data }) {
        return data.value.name == "1";
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
      type: "DatePicker",
      label: "出生日期",
      model: "birth",
      row: [8],
    },
    {
      row: [8],
      align: "right",
      render() {
        return (
          <>
            <ElButton
              type="primary"
              onClick={() => {
                dialogForm.data.value = {
                  name: "",
                  phone: "",
                  idCard: "",
                  birth: "",
                  age: "",
                };
                dialogRef.value.open({
                  title: "新增用户",
                  disabled: false,
                });
              }}
            >
              新增
            </ElButton>
            <ElButton
              type="info"
              onClick={() => {
                searchFormRef.value.reset();
                tableRef.value.run();
              }}
            >
              重置
            </ElButton>
            <ElButton
              type="success"
              onClick={() => {
                tableRef.value.run();
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
    idCard: "",
    birth: "",
    phone: "",
  }),
  // labelWidth: 80,
});

const dialogForm = CreateFormOption({
  disabled: ref(false),
  form: [
    {
      type: "Input",
      label: "姓名",
      model: "name",
      row: [12],
    },
    {
      type: "Input",
      label: "电话号码",
      row: [12],
      model: "phone",
    },
    {
      type: "Input",
      label: "身份证号",
      row: [12],
      model: "idCard",
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
  ],
  api: ref("createUser"),
  labelWidth: 120,
  data: ref({
    name: "",
    age: "",
    birth: "",
  }),
  createRule(create) {
    return {
      name: create.must(),
      birth: create.must(),
      age: create.must(),
      idCard: create.must(),
      phone: create.must().rules,
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
                dialogRef.value.open({
                  title: "用户编辑",
                  disabled: false,
                });
                dialogForm.data.value = {
                  name: "",
                  phone: "",
                  idCard: "",
                  birth: "",
                  age: "",
                };
              }}
            >
              编辑
            </ElButton>
            <ElButton
              type="primary"
              onClick={() => {
                dialogRef.value.open({
                  disabled: true,
                  title: "详情",
                });
                dialogForm.data.value = {
                  name: "pxpx",
                  phone: "1234",
                  idCard: "123234",
                  birth: "2022-02-03",
                  age: "12",
                };
              }}
            >
              详情
            </ElButton>
          </>
        );
      },
    },
  ],
});
</script>
