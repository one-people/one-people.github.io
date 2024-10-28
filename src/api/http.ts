import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 的 base_url
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      // config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    if (response.status !== 200) {
      // 可以根据项目需求自定义
      return Promise.reject(new Error("Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * 封装GET请求
 * @param url 请求的URL
 * @param params 请求的参数
 * @param config 额外的配置项
 * @returns Promise
 */
export async function get<T = any>(
  url: string,
  params?: object,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: any = await service.get<T>(url, { ...config, params });
  return response;
}

/**
 * 封装POST请求
 * @param url 请求的URL
 * @param data 提交的数据
 * @param config 额外的配置项
 * @returns Promise<T>
 */
export async function post<T = any>(
  url: string,
  data?: object,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: any = await service.post<T>(url, data, config);
  return response;
}

export default service;
