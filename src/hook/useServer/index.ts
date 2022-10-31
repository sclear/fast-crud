import { onMounted, reactive, ref, unref, UnwrapRef, Ref } from "vue";
import { request } from "./lib";
import { ResponseData, Code } from "./lib/index.type";
import { api } from "./../../server";
import qs from "qs";

export type ApiType = keyof typeof api;

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

interface UseServerConfig<Result, T> {
  api: ApiType | Ref<ApiType>;
  data?: UnwrapRef<any>;
  default?: any;
  autoRun?: boolean;
  urlParams?: UnwrapRef<any>;
  onError?: (err: any) => void;
  onSuccess?: (data: ResponseData<T>) => void;
  beforeSetData?: (data: ResponseData<T>) => Result;
}

interface UseServerReturn<Result> {
  /**
   * @Description 应用数据Data
   * @param {unknown}
   */
  data: Ref<Result>;
  loading: Ref<boolean>;
  code: Ref<Code>;
  run: () => void;
}

type ResultData<T, K> = IfAny<K, T, K>;

export function useServer<T = any, K = any>(
  config: UseServerConfig<ResultData<T, K>, T>
): UseServerReturn<ResultData<T, K>> {
  const data = ref(config?.default || []);
  const loading = ref(false);
  const code = ref<Code>(0);

  function run() {
    loading.value = true;
    const method = unref(config.api);
    const httpModule = api[method];
    request[httpModule.method](
      api[method].url + qs.stringify(config?.urlParams || {}),
      ["get", "delete"].includes(api[method].method)
        ? {
            params: config?.data?.value,
          }
        : config?.data?.value
    )
      .then((res) => {
        if (res.code === 200) {
          data.value = config.beforeSetData
            ? config.beforeSetData(res)
            : res.data;
          config.onSuccess && config.onSuccess(res);
        } else {
          config.onError && config.onError(res);
        }
      })
      .catch((err) => {
        config?.onError && config.onError(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  onMounted(() => {
    config?.autoRun && run();
  });

  return {
    /**
     * @Description 应用数据Data
     * @param {unknown}
     */
    data,
    /**
     * @Description Loading
     * @param {Boolean}
     */
    loading,
    /**
     * @Description 响应code
     * @param {Number}
     */
    code,
    /**
     * @Description 触发器
     * @param {Function}
     */
    run,
  };
}
