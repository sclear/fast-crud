import { Ref, computed, unref, ComputedRef } from "vue";
import { ElCol, ElFormItem } from "element-plus";
import { Components } from "../Form/components";
import { pick } from "../../tools/util";
import { RuleItem } from "async-validator";
import createRules from "./../../tools/validate";
import { ApiType } from "../../hook/useServer";

export { createRules };
interface FormType {
  type?: keyof typeof Components;
  label?: string;
  model?: string;
  row?: number[];
  align?: "left" | "right" | "center";
  vIf?: (args: { value: unknown; model: string; data: any }) => boolean;
  vDisabled?: (args: { value: unknown; model: string; data: any }) => boolean;
  render?: (disabled: ComputedRef<boolean>) => JSX.Element | string;
  renderFormItem?: (
    model: string,
    data: Ref<any>,
    disabled: ComputedRef<boolean>
  ) => JSX.Element;
  labelWidth?: number;
  placeholder?: string;
  className?: string;
  onChange?: (data: any) => void;
  dataSource?: Ref<any[]> | any[];
  customProps?: object;
}
export type CreateFormOptions = {
  form: FormType[];
  disabled?: Ref<boolean> | undefined;
  data: Ref<any>;
  labelWidth?: number;
  api?: ApiType | Ref<ApiType>;
  onChange?: (data: any) => void;
  onSuccess?: (done: () => void) => void;
  onError?: (done: () => void) => void;
  createRule?: (
    ruleInstance: typeof createRules
  ) => Record<string, RuleItem[] | typeof createRules>;
};

export function CreateElForm(
  option: CreateFormOptions,
  props: any,
  dialog: any
): JSX.Element {
  return (
    <>
      {option.form.map((item) => {
        let prop = pick(item, [
          "label",
          "model",
          "placeholder",
          "dataSource",
          "customProps",
        ]);

        // computed v-if
        const vif = computed(() => {
          if (
            item.vIf &&
            item.model &&
            item.vIf({
              model: item.model || "",
              value: props.data.value[item.model],
              data: props.data.value,
            })
          ) {
            return false;
          } else return true;
        });
        if (!vif.value) return "";

        // component v-disabled
        const disabled = computed(() => {
          console.log(dialog);
          // if (unref(option.disabled) === true) return true;
          if (unref(option.disabled) === true || unref(dialog.disabled))
            return true;
          else if (
            item.model &&
            !unref(option.disabled) &&
            item.vDisabled &&
            item.vDisabled({
              model: item.model || "",
              value: props.data.value[item.model],
              data: props.data.value,
            })
          ) {
            return true;
          } else return false;
        });

        const row = item.row || [24, 0];
        const align = item.align || "left";
        const alignGroup = {
          left: "flex-start",
          center: "center",
          right: "flex-end",
        };
        // render custom component
        if (item.render || item.renderFormItem || !item.type) {
          if (item.render) {
            return (
              <>
                <ElCol span={row[0] || 24} offset={row[1] || 0}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: alignGroup[align],
                    }}
                  >
                    {item.render(disabled)}
                  </div>
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
                    props.data,
                    disabled
                  )}
                </ElFormItem>
              </ElCol>
            );
          }
          return "";
        }

        const CustomComponent = Components[item.type];

        if (!item.model) return "";

        const childProp = {
          ...prop,
          disabled: disabled,
          onChange: (value: unknown, type: string) => {
            const data = {
              type,
              value,
            };
            item.onChange && item.onChange(data);
            option.onChange && option.onChange(data);
          },
        };

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
                  {...childProp}
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
