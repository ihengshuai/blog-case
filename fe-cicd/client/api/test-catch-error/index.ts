import type { IHttpRequestConfig } from "@/typings/common/http";
import { CaptureError } from "@/util";
import { BaseRequest } from "@/util/common/request/base-request";

import { UploadUserAvatarErrorMessage } from "./error-message";

export class CatchErrorModuleApi extends BaseRequest {
  @CaptureError(UploadUserAvatarErrorMessage)
  async uploadUserAvatarError(id: number, config?: IHttpRequestConfig) {
    return this.httpClient.get("/api/mock/open/ios/{id}", { urlPath: { id }, captureError: false, ...config });
  }
}
