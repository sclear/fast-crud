import { defineComponent, PropType } from "vue";
import { ElInput, ElCol, ElFormItem } from "element-plus";

export default defineComponent({
  props: {
    model: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { placeholder, label, model } = props;
    return () => (
      <>
        <ElInput
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
