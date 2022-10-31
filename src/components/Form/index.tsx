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
} from "vue";
import { ElForm, ElRow, ElCol, ElFormItem } from "element-plus";
import createRules from "./../../tools/validate";
import { useServer, ApiType } from "../../hook/useServer";
import { CreateElForm, CreateFormOptions } from "./../FormItem";

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

    const dialog = inject<{
      setFormInstance: (instance: ComponentInternalInstance | null) => void;
    }>("renderDialog");

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

    return () => (
      <>
        <ElForm
          ref={elFormRef}
          labelWidth={createOption.labelWidth || 120}
          model={props.createOption.data}
          rules={formRules || {}}
        >
          <ElRow>{CreateElForm(createOption, props.createOption)}</ElRow>
        </ElForm>
      </>
    );
  },
});
