import { defineComponent, onMounted, PropType } from "vue";
import { ElDatePicker, ElCol, ElFormItem } from "element-plus";

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
        <ElDatePicker
          style={{
            width: "100%",
          }}
          placeholder={placeholder || `请选择${label}`}
          type="date"
          onUpdate:modelValue={(e: any) => {
            emit("update:modelValue", e);
            emit("change", e, model);
          }}
          value-format="YYYY-MM-DD"
          modelValue={props.modelValue}
        />
      </>
    );
  },
});
