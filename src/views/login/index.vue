<template>
  <div class="login">
    <div class="login-form">
      <el-form
        ref="formRef"
        :model="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="user" prop="user">
          <el-input
            v-model.number="numberValidateForm.age"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="pass" prop="pass">
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
import { useRouter } from "vue-router";
import { useSetting } from "@/store/setting";
const router = useRouter();
const setting = useSetting();

const numberValidateForm = reactive({
  age: "",
});

const formRef = ref();

const { createRules, reset, validate } = useValidate({
  instance: formRef,
  onSuccess() {
    setting.setMenu([
      {
        title: "主页",
        icon: "",
        path: "/homepage",
      },
      {
        title: "一级菜单",
        icon: "",
        path: "tem",
        children: [
          {
            title: "test",
            icon: "",
            path: "/test",
          },
        ],
      },
    ]);
    router.push({
      path: "/homepage",
    });
  },
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
}
</style>
