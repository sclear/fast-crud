import { PropType, Ref } from "vue";

export const propsType = {
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
  dataSource: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Object as unknown as PropType<Ref<boolean>>,
    default: false,
  },
};
