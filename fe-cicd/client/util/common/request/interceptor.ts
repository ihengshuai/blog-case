import { message } from "ant-design-vue";
import { AxiosError, isCancel } from "axios";

import { snakeToCamel } from "@/util";

import { CancelToken } from "./cancel-token";
import { HttpClient } from "./constructor";

HttpClient.axiosInstance.interceptors.request.use(config => {
  // cancel token
  if (config.ignoreCancelToken !== true) {
    CancelToken.instance.register(config);
  }

  // 时间戳
  if (config.timeStamp === true && config.method === "get") {
    Object.assign(config, {
      params: {
        ...config.params,
        _t: +new Date(),
      },
    });
  }

  console.log(
    `%c 请求日志: %c${config.label ? `【${config.label}】` : ""}`,
    "background:gray;padding:2px 4px;color:#fff;font-weight:600",
    null,
    config
  );

  return config;
});

HttpClient.axiosInstance.interceptors.response.use(res => {
  const result = {
    ...res,
    payload: res.data,
  };
  delete result.data;
  return result;
});

HttpClient.axiosInstance.interceptors.response.use(
  res => {
    const { payload, config } = res;
    const { data, code = 500, error, message } = payload || {};

    CancelToken.instance.cancel(config);

    // 业务状态码成功
    if (code === 200 || code < 300) {
      console.log(
        `%c 响应日志: %c${config.label ? `【${config.label}】` : ""}`,
        "background:green;padding:2px 4px;color:#fff;font-weight:600",
        null,
        res
      );

      const { transferToCamel } = config;
      return transferToCamel !== false ? snakeToCamel(data) : data;
    }

    // 业务不成功
    const _error = new Error(error || message || "Server Error...") as AxiosError;
    _error.response = data;
    _error.isAxiosError = false;
    _error.config = config;
    _error.response = res;
    _error.code = code as any;
    throw _error;
  },
  (error: AxiosError<any>) => {
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    return Promise.reject(error);
  }
);
HttpClient.axiosInstance.interceptors.response.use(
  payload => payload,
  (err: AxiosError) => {
    const { code, config, message: _message } = err || {};

    console.log(
      `%c 错误日志: %c${config?.label ? `【${config.label}】` : ""}`,
      "background:red;padding:2px 4px;color:#fff;font-weight:600",
      null,
      err.code,
      err.message,
      err
    );

    if (err.response?.status === 504 || err.code === "ETIMEDOUT" || err.code === "ECONNABORTED") {
      message.error({ content: "Timeout" });
      return Promise.reject(err);
    }
    // 根据前后端规定的指定字段状态码进行判断
    if (!isCancel(err) && code !== "ECONNABORTED") {
      const { captureError } = config?.$request || {};
      if (captureError !== false) {
        message.error({ content: _message || "Server Error..." });
      }
    }
    return Promise.reject(err);
  }
);
