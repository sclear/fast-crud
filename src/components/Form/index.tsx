import {
  defineComponent,
  inject,
  onMounted,
  PropType,
  reactive,
  Ref,
  ref,
  UnwrapRef,
  getCurrentInstance,
  ComponentInternalInstance,
  computed,
  watch,
} from "vue";
import { ElForm, ElRow, ElCol, ElFormItem } from "element-plus";
import { Components } from "./components";
import { pick } from "../../tools/util";
import { RuleItem } from "async-validator";
import createRules from "./../../tools/validate";
import { useServer, ApiType } from "../../hook/useServer";

export { createRules };
interface FormType {
  type?: keyof typeof Components;
  label?: string;
  model?: string;
  row?: number[];
  vIf?: (args: { value: unknown; model: string; data: any }) => boolean;
  render?: () => JSX.Element;
  labelWidth?: number;
  placeholder?: string;
  className?: string;
  onChange?: (data: any) => void;
}
export interface CreateFormOptions {
  form: FormType[];
  data: Ref<object>;
  labelWidth?: number;
  api?: ApiType;
  // fullApi?: ApiType;
  // fullParams?: Ref<any>;
  onChange?: (data: any) => void;
  hiddenFields: Ref<string[]>;
  onSuccess?: (done: () => void) => void;
  onError?: (done: () => void) => void;
  createRule?: (ruleInstance: typeof createRules) => Record<string, RuleItem[]>;
}

interface OnChangeOption {
  type: string;
  value: unknown;
  addHidden: () => void;
  removeHidden: () => void;
  getHiddenFields: () => Ref<string[]>;
}

function CreateElForm(
  option: CreateFormOptions,
  data: UnwrapRef<any>,
  props: any
): JSX.Element {
  const hiddenFields = option.hiddenFields;
  return (
    <>
      {option.form.map((item) => {
        let prop = {};
        if (item.type === "Input") {
          prop = pick(item, ["label", "className", "model", "placeholder"]);
        }
        const row = item.row || [24, 0];
        // render custom component
        if (item.render || !item.type || !item.model) {
          if (item.render) {
            return (
              <>
                <ElCol span={row[0] || 24} offset={row[1] || 0}>
                  {item.render()}
                </ElCol>
              </>
            );
          }
          return "";
        }
        console.log(hiddenFields.value);
        if (
          hiddenFields.value.includes(item.model) ||
          (item.vIf &&
            item.vIf({
              model: item.model,
              value: props.data.value[item.model],
              data: props.data.value,
            }) === false)
        ) {
          return "";
        }
        const CustomComponent = Components[item.type];
        return (
          <>
            <ElCol span={row[0] || 24} offset={row[1] || 0}>
              <ElFormItem
                labelWidth={item.labelWidth || undefined}
                label={item.label + ":"}
                class={item.className}
                prop={item.model}
              >
                <CustomComponent
                  {...prop}
                  onChange={(value: unknown, type: string) => {
                    const data = {
                      type,
                      value,
                      addHidden(field: string) {
                        if (typeof value === "string") {
                          hiddenFields.value.push(field);
                        } else {
                          hiddenFields.value = [
                            ...new Set(...hiddenFields.value, ...field),
                          ];
                        }
                      },
                      removeHidden(field: string) {
                        if (typeof value === "string") {
                          hiddenFields.value.push(field);
                        } else {
                          hiddenFields.value = [
                            ...new Set(...hiddenFields.value, ...field),
                          ];
                        }
                      },
                      getField() {},
                    };
                    item.onChange && item.onChange(data);
                    option.onChange && option.onChange(data);
                  }}
                  v-model={props.data.value[item.model]}
                />
              </ElFormItem>
            </ElCol>
          </>
        );
      })}
    </>
  );
}

export function CreateFormOption(option: CreateFormOptions): CreateFormOptions {
  return option;
}

interface Props {
  createOption: CreateFormOptions;
  data: UnwrapRef<any>;
  rules: Record<string, RuleItem[]>;
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
      console.log("reseet");
      elFormRef.value.resetFields();
      console.log(props.data);
    }

    const dialog = inject<{
      setFormInstance: (instance: ComponentInternalInstance | null) => void;
    }>("renderDialog");

    const instance = getCurrentInstance();

    onMounted(() => {
      dialog?.setFormInstance && dialog?.setFormInstance(instance);
    });

    const { data, createOption } = props;

    const requestData = computed(() => {
      return {
        ...data,
      };
    });

    onMounted(() => {
      console.log("create");
    });

    expose({
      validate(done: (isClose?: boolean) => void) {
        console.log(props.data);
        elFormRef.value.validate((valid: boolean) => {
          if (valid) {
            // if has request api
            if (createOption.api) {
              console.log(createOption.api);
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

    return () => (
      <>
        <ElForm
          ref={elFormRef}
          labelWidth={createOption.labelWidth || 120}
          model={props.createOption.data}
          rules={formRules || {}}
        >
          <ElRow>
            {CreateElForm(createOption, props.data, props.createOption)}
          </ElRow>
        </ElForm>
      </>
    );
  },
});
