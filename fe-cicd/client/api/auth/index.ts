import { useConfig } from "@/config";
import { IHttpRequestConfig } from "@/typings/common/http";
import { request } from "@/util";

const config = useConfig();

/** 测试相关地址 */
export const AUTH_API = {
  /** 请求用户信息 */
  auth: `${config.API_DOMAIN}/auth`,
};

/** 测试请求并发限制 */
export function getUserAuth(config?: IHttpRequestConfig): Promise<{ accessToken: string }> {
  return request.get(AUTH_API.auth, {
    ignoreCancelToken: true,
    captureError: false,
    ...config,
  });
}
