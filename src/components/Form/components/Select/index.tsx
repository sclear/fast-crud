import { defineComponent, PropType } from "vue";
import { ElSelect, ElOption, ElCol, ElFormItem } from "element-plus";
import { propsType } from "./../propsType";

export default defineComponent({
  props: propsType,
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { placeholder, label, model } = props;
    console.log(props.dataSource);
    return () => (
      <>
        <ElSelect
          placeholder={placeholder || `请输入${label}`}
          onChange={(e) => {
            emit("update:modelValue", e);
            emit("change", e, model);
          }}
          modelValue={props.modelValue}
        >
          {props.dataSource.map((item: any) => {
            return (
              <ElOption
                key={item.value}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </ElSelect>
      </>
    );
  },
});
