import { HttpClient } from "./constructor";
import "./interceptor";

export const request = HttpClient.instance;
export * from "./concurrency-limit";
export * from "./base-error";
export * from "./decorator";
