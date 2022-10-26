import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  ref,
  ComponentInternalInstance,
} from "vue";
import type { PropType } from "vue";
import { ElDialog, ElButton, ElIcon } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import "./index.less";

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
    },
    confirm: {
      type: Function as PropType<(cb: (isClose?: boolean) => void) => void>,
    },
    cancel: {
      type: Function as PropType<() => void>,
    },
    width: {
      type: Number as PropType<number>,
    },
    elProps: {
      type: Object as PropType<Record<string, number | string | boolean>>,
    },
  },
  emits: {
    valid: () => void 0,
  },
  setup(props, ctx) {
    const { width, elProps, title, confirm, cancel } = props;

    const visible = ref(false);
    const buttonLoading = ref(false);
    const slot = ctx.slots;
    let formInstance = ref<ComponentInternalInstance | null>(null);

    onMounted(() => {
      const instance = getCurrentInstance();
    });

    // close callback
    function closeModel() {
      buttonLoading.value = true;
      // form联动
      if (formInstance.value) {
        formInstance.value?.exposed?.validate &&
          formInstance.value?.exposed?.validate((isClose?: boolean) => {
            if (isClose || isClose === undefined) {
              buttonLoading.value = false;
              visible.value = false;
            } else {
              buttonLoading.value = false;
            }
          });
        return;
      }

      // if props has confirm callback
      if (confirm) {
        confirm((isClose?: boolean) => {
          if (isClose || isClose === undefined) {
            buttonLoading.value = false;
            visible.value = false;
          } else {
            buttonLoading.value = false;
          }
        });
        return;
      }
      buttonLoading.value = false;
      visible.value = false;
    }

    // cancel call form reset
    function cancelCallReset() {
      if (formInstance.value) {
        formInstance.value?.exposed?.validate &&
          formInstance.value?.exposed?.reset();
      }
    }

    // slots
    const slots = {
      header: () => (
        <div>
          <div class="dialog-header">
            <span>{title || "标题"}</span>
            <div
              onClick={() => {
                visible.value = false;
                buttonLoading.value = false;
              }}
            >
              <ElIcon>
                <Close class="pointer" />
              </ElIcon>
            </div>
          </div>
        </div>
      ),
      footer: () => {
        return (
          slot.footer || (
            <>
              <ElButton
                onClick={() => {
                  cancel && cancel();
                  cancelCallReset();
                  visible.value = false;
                }}
              >
                取消
              </ElButton>
              <ElButton
                type="primary"
                onClick={closeModel}
                loading={buttonLoading.value}
              >
                确定
              </ElButton>
            </>
          )
        );
      },
    };

    // exports
    ctx.expose({
      open(params: any) {
        visible.value = true;
      },
    });

    // provide
    provide("renderDialog", {
      setFormInstance(instance: ComponentInternalInstance | null) {
        console.log(formInstance);
        formInstance.value = instance;
      },
    });

    return () => (
      <>
        <ElDialog
          {...elProps}
          destroy-on-close
          v-model={visible.value}
          width={width}
          append-to-body={true}
          v-slots={slots}
          show-close={false}
          close-on-click-modal={false}
          close-on-press-escape={false}
        >
          {slot.default && slot.default()}
        </ElDialog>
      </>
    );
  },
});
