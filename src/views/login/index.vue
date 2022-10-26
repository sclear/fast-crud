<template>
  <div class="login">
    <div class="login-form">
      <el-form
        ref="formRef"
        :model="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="user"
          prop="user"
          :rules="[
            { required: true, message: 'age is required' },
            { type: 'number', message: 'age must be a number' },
          ]"
        >
          <el-input
            v-model.number="numberValidateForm.age"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="pass"
          prop="pass"
          :rules="[
            { required: true, message: 'age is required' },
            { type: 'number', message: 'age must be a number' },
          ]"
        >
          <el-input
            v-model.number="numberValidateForm.age"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validate">Submit</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { reactive, ref, ExtractPropTypes } from "vue";
import type { FormInstance } from "element-plus";
import { useValidate } from "./../../hook/useValidate/";

const numberValidateForm = reactive({
  age: "",
});

const rule = {
  name: [
    {
      required: true,
      length: 3,
      message: "xxx",
    },
  ],
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const formRef = ref();

const { createRules, reset, validate } = useValidate({
  instance: formRef,
  onSuccess() {},
  onError() {
    console.log("验证失败");
  },
});

const rules = {
  name: createRules.must().length(3).rules,
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 600px;
  // height: 450px;
}
</style>
