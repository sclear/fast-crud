import { defineComponent, PropType, Ref } from "vue";
import { ElInput, ElCol, ElFormItem } from "element-plus";
import { propsType } from "./../propsType";

export default defineComponent({
  props: propsType,
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { placeholder, label, model, disabled } = props;
    return () => (
      <>
        <ElInput
          disabled={disabled.value}
          placeholder={placeholder || `请输入${label}`}
          onInput={(e) => {
            emit("update:modelValue", e);
            emit("change", e, model);
          }}
          modelValue={props.modelValue}
        />
      </>
    );
  },
});