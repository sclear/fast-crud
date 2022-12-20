import { computed, defineComponent, reactive, ref, unref } from "vue";
import type { PropType } from "vue";
import "./index.less";
import { ElTable, ElPagination, ElTableColumn } from "element-plus";
import { omit } from "../../tools/util";
import { useServer, ApiType } from "../../hook/useServer";

interface SlotsParams {
  row: any[];
  $index: any[];
}

const defaultProps = {
  align: "center",
};

interface CreateTable {
  api: ApiType;
  column: Column[];
  beforeSetData?: any;
}

// 生成Table数据
export function CreateTableOption(option: CreateTable): CreateTable {
  return option;
}

// 递归解析tableHeader
function deepResolver(jsxNodes: any[]) {
  if (!jsxNodes || !jsxNodes.length) return;
  return jsxNodes.map((item) => {
    const prop = {
      ...omit(item, ["children", "render"]),
      ...defaultProps,
      ...(item.customProps || {}),
    };
    const slots = {
      default: (slots: SlotsParams) => {
        return item.render
          ? item.render(slots?.row[prop?.prop], slots.row, slots.$index)
          : null;
      },
    };
    if (item.children) {
      return (
        <ElTableColumn {...prop}>{deepResolver(item.children)}</ElTableColumn>
      );
    } else
      return (
        <ElTableColumn v-slots={slots} {...prop}>
          {deepResolver(item.children)}
        </ElTableColumn>
      );
  });
}

interface Column {
  prop?: string;
  label?: string;
  customProps?: Record<string, unknown>;
  render?: (
    text: string,
    row: object,
    $index: number
  ) => JSX.Element | string | any;
}
export default defineComponent({
  props: {
    createOption: {
      type: Object as PropType<CreateTable>,
      default: [],
    },
    beforeSetData: {
      type: Function,
    },
    searchParams: {
      type: Object as PropType<any>,
    },
  },
  setup(props, { expose }) {
    const pagination = reactive({
      pageSize: 10,
      currentPage: 1,
      total: 300,
    });

    const params = computed(() => {
      return {
        ...pagination,
        ...(unref(props.searchParams || {}) || {}),
      };
    });
    const { loading, run, data } = useServer({
      api: props.createOption.api,
      data: params,
      autoRun: true,
      beforeSetData:
        props.createOption.beforeSetData ||
        function (res) {
          return res.data;
        },
      onSuccess(res) {
        pagination.total = res.total;
      },
    });

    expose({
      run,
    });

    return () => (
      <div v-loading={loading.value}>
        <ElTable data={data.value} border>
          {deepResolver(props.createOption.column)}
        </ElTable>
        <ElPagination
          class="pagination"
          v-model:page-size={pagination.pageSize}
          v-model:currentPage={pagination.currentPage}
          total={pagination.total}
          layout="prev, pager, next"
          onSize-change={() => {
            run();
          }}
          onCurrent-change={() => {
            run();
          }}
        />
      </div>
    );
  },
});
