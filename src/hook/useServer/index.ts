import { onMounted, ref, unref, UnwrapRef, Ref, isRef } from "vue";
import { request } from "./lib";
import { ResponseData, Code, IfAny } from "./lib/index.type";
import serverSetting from "./../../server/index";

const { getApiModule } = serverSetting;

type InputApi = Parameters<typeof getApiModule>[0];

export type ApiType = InputApi;
interface UseServerConfig<Result, T, U> {
  api: InputApi | Ref<InputApi>;
  data?: U;
  default?: any;
  autoRun?: boolean;
  urlParams?: UnwrapRef<any> | Ref<any>;
  onError?: (err: any) => void;
  onSuccess?: (data: T, response: ResponseData<T>) => void;
  beforeSetData?: (data: T, response: ResponseData<T>) => Result;
  responseType?: "json" | "blob";
  downloadOption?: {
    fileName: string;
    isDownload?: 0 | 1;
  };
}

function isObject(t: any): t is object {
  return typeof t === "object";
}

interface UseServerReturn<Result, U> {
  /**
   * @Description 应用数据Data
   * @param {unknown}
   */
  data: Ref<Result>;
  loading: Ref<boolean>;
  code: Ref<Code>;
  run: () => void;
  config: {
    data: U extends object ? U : any;
    api: Ref<InputApi>;
    urlParams: Ref<any>;
  };
}

type ResultData<T, K> = IfAny<K, T, K>;

export function useServer<T = any, K = any, U extends object = any>(
  config: UseServerConfig<ResultData<T, K>, T, U>
): UseServerReturn<ResultData<T, K>, U> {
  const data = ref(config?.default || []);
  const loading = ref(false);
  const code = ref<Code>(0);

  /**
   * @description config api
   * @param {Ref<ApiType>}
   */
  const configApi = isRef(config.api) ? config.api : ref(config.api);

  /**
   * @description config urlParams
   * @param {Ref<string>}
   */
  const configUrlParams = isRef(config.urlParams)
    ? config.urlParams
    : ref(config.urlParams);

  function run() {
    loading.value = true;
    const method = unref(configApi);
    const httpModule = getApiModule(method);
    console.log(httpModule);
    // Mock
    if (
      httpModule._Mock_ !== false &&
      httpModule.Mock &&
      process.env.VITE_API_Mock_ === "1"
    ) {
      data.value = config.beforeSetData
        ? config.beforeSetData(httpModule.Mock, {
            code: 200,
            message: "",
            data: httpModule.Mock,
          })
        : httpModule.Mock;
      config.onSuccess &&
        config.onSuccess(httpModule.Mock, {
          code: 200,
          message: "",
          data: httpModule.Mock,
        });
      loading.value = false;
    } else {
      request[httpModule.method](
        httpModule.url + (unref(configUrlParams || undefined) || ""),
        ["get", "delete"].includes(httpModule.method)
          ? {
              params: unref(config.data),
              responseType: config?.responseType || "json",
            }
          : unref(config.data)
      )
        .then((res) => {
          if (res.code === 200) {
            console.log(res.data);
            data.value = config.beforeSetData
              ? config.beforeSetData(res.data, res)
              : res.data;
            config.onSuccess && config.onSuccess(res.data, res);
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
  }

  onMounted(() => {
    config?.autoRun && run();
  });

  return {
    /**
     * @Description 应用数据Data
     * @param {Ref<unknown>}
     */
    data,
    /**
     * @Description Loading
     * @param {Ref<Boolean>}
     */
    loading,
    /**
     * @Description 响应code
     * @param {Ref<Number>}
     */
    code,
    /**
     * @Description 触发器
     * @param {Function}
     */
    run,
    /**
     * @Description config
     * @param {Object}
     */
    config: {
      data: isObject(config.data) ? config.data : ({} as any),
      api: configApi,
      urlParams: configUrlParams,
    },
  };
}
