import type { FormInstance } from "element-plus";
import { RuleItem } from "async-validator";
import createRules from "./../../tools/validate";
import type { Ref } from "vue";

interface UseValidateArgs {
  instance: Ref<FormInstance | undefined>;
  //   rules?: Record<string, RuleItem | RuleItem[]>;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useValidate(args: UseValidateArgs) {
  return {
    reset() {
      args.instance.value?.resetFields();
    },
    createRules,
    validate() {
      args.instance.value?.validate((valid) => {
        if (valid) {
          args.onSuccess && args.onSuccess();
        } else args.onError && args.onError();
      });
    },
  };
}
