import { getToken } from "@/utils/store_manager";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    // Thêm interceptor để tự động gắn token vào header
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Xử lý lỗi chung
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // Có thể custom xử lý lỗi ở đây
        if (error.response) {
          // Xử lý lỗi trả về từ server
          // Ví dụ: thông báo lỗi, redirect, ...
        } else if (error.request) {
          // Không nhận được phản hồi từ server
        } else {
          // Lỗi khác
        }
        return Promise.reject(error);
      }
    );
  }

  // Hàm get
  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then((res) => res.data);
  }

  // Hàm post
  protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<T>(url, data, config).then((res) => res.data);
  }

  // Hàm put
  protected put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put<T>(url, data, config).then((res) => res.data);
  }

  // Hàm delete
  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete<T>(url, config).then((res) => res.data);
  }
}