import axios from "axios";
import { ResponseData } from "./index.type";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Request {
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = { timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    // 请求拦截
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token
        // if (token) config.headers && (config.headers.Authorization = token);

        return config;
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.status == 401 || res.data?.code == "401") {
        } else if (res.data?.code === 0 || res.data?.code === "0") {
          // 错误响应
        }
        return res.data;
      },
      (err: any) => {
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  // 快捷方法
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.delete(url, config);
  }
}

export const request = new Request({});
