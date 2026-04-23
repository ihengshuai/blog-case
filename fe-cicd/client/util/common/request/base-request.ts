import { HttpClient } from "./constructor";

export class BaseRequest {
  protected get httpClient() {
    return HttpClient.instance;
  }
}
