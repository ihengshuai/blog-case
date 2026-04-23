import { useConfig } from "@/config";
import { IHttpRequestConfig } from "@/typings/common/http";
import { request } from "@/util";

const config = useConfig();

/** 测试相关地址 */
export const TEST_API = {
  testConcurrency: `${config.API_DOMAIN}/test/concurrency`,
};

/** 测试请求并发限制 */
export function fetchTestConcurrency(id?: number, config?: IHttpRequestConfig): Promise<number> {
  return request.get(TEST_API.testConcurrency, {
    params: {
      id,
    },
    ignoreCancelToken: true,
    captureError: false,
    ...config,
  });
}
