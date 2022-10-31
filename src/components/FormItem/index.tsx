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
import { Components } from "../Form/components";
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
  renderFormItem?: (model: string, data: Ref<any>) => JSX.Element;
  labelWidth?: number;
  placeholder?: string;
  className?: string;
  onChange?: (data: any) => void;
}
export interface CreateFormOptions {
  form: FormType[];
  data: Ref<object>;
  labelWidth?: number;
  api?: ApiType | Ref<ApiType>;
  onChange?: (data: any) => void;
  onSuccess?: (done: () => void) => void;
  onError?: (done: () => void) => void;
  createRule?: (ruleInstance: typeof createRules) => Record<string, RuleItem[]>;
}

export function CreateElForm(
  option: CreateFormOptions,
  props: any
): JSX.Element {
  return (
    <>
      {option.form.map((item) => {
        let prop = {};
        if (item.type === "Input") {
          prop = pick(item, ["label", "className", "model", "placeholder"]);
        }
        const row = item.row || [24, 0];
        // render custom component
        if (item.render || item.renderFormItem || !item.type) {
          if (item.render) {
            return (
              <>
                <ElCol span={row[0] || 24} offset={row[1] || 0}>
                  {item.render()}
                </ElCol>
              </>
            );
          }
          if (item.renderFormItem && item.model) {
            return (
              <ElCol span={row[0] || 24} offset={row[1] || 0}>
                <ElFormItem
                  labelWidth={item.labelWidth || undefined}
                  label={item.label + ":"}
                  class={item.className}
                  prop={item.model}
                >
                  {item.renderFormItem(
                    props.data.value[item.model],
                    props.data
                  )}
                </ElFormItem>
              </ElCol>
            );
          }
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
