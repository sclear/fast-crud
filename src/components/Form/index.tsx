import {
  defineComponent,
  inject,
  onMounted,
  PropType,
  reactive,
  ref,
  UnwrapRef,
  getCurrentInstance,
  ComponentInternalInstance,
  computed,
} from "vue";
import { ElForm, ElRow } from "element-plus";
import createRules, { isCreateValidateInstance } from "./../../tools/validate";
import { useServer } from "../../hook/useServer";
import { CreateElForm, CreateFormOptions } from "./../FormItem";
import { RuleItem } from "async-validator";

export { createRules };

export function CreateFormOption(option: CreateFormOptions): CreateFormOptions {
  return option;
}

export default defineComponent({
  name: "createForm",
  props: {
    createOption: {
      type: Object as PropType<CreateFormOptions>,
      default: {
        form: [
          {
            type: "Input",
            label: "姓名",
            model: "name",
            row: [10],
          },
        ],
        onChange() {},
      },
    },
    data: {
      type: Object as PropType<UnwrapRef<any>>,
      default: reactive({
        name: "",
      }),
    },
  },
  emit: ["update:data"],
  setup(props, { expose, emit }) {
    const elFormRef = ref();

    function reset() {
      elFormRef.value.resetFields();
      console.log(props.data);
    }

    const dialog =
      inject<{
        setFormInstance: (instance: ComponentInternalInstance | null) => void;
      }>("renderDialog") || null;

    const instance = getCurrentInstance();

    onMounted(() => {
      dialog?.setFormInstance && dialog?.setFormInstance(instance);
    });

    const { createOption } = props;

    const requestData = computed(() => {
      return {
        ...createOption.data.value,
      };
    });

    expose({
      validate(done: (isClose?: boolean) => void) {
        console.log(props.data);
        elFormRef.value.validate((valid: boolean) => {
          if (valid) {
            // if has request api
            if (createOption.api) {
              const { run } = useServer({
                api: createOption.api,
                data: requestData,
                onSuccess(res) {
                  if (res.code === 200) {
                    createOption.onSuccess && createOption.onSuccess(done);
                    reset();
                  }
                },
              });
              run();
              return;
            }
            createOption.onSuccess && createOption.onSuccess(done);
          } else {
            done(false);
            createOption.onError && createOption.onError(done);
          }
        });
      },
      reset,
    });

    let formRules =
      createOption.createRule && createOption.createRule(createRules);

    function calcRules(
      rules: Record<string, RuleItem[] | typeof createRules>
    ): Record<string, RuleItem[]> {
      // rule result
      const result: Record<string, RuleItem[]> = {};

      Object.keys(rules).forEach((key: keyof typeof rules) => {
        const ruleItem = rules[key];

        if (isCreateValidateInstance(ruleItem)) {
          result[key] = ruleItem.rules;
        } else {
          result[key] = ruleItem;
        }
      });
      return result || {};
    }

    return () => (
      <>
        <ElForm
          ref={elFormRef}
          labelWidth={createOption.labelWidth || 120}
          model={props.createOption.data}
          rules={calcRules(formRules || {})}
        >
          <ElRow>{CreateElForm(createOption, props.createOption)}</ElRow>
        </ElForm>
      </>
    );
  },
});
