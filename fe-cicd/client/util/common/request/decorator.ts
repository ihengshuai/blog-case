import "reflect-metadata";
import { IDict } from "@/typings/common/type";

import { BaseError } from "./base-error";

export function CaptureError(errors: IDict) {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    const origin = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const res = await origin.call(this, ...args);
        return res;
      } catch (err) {
        throw new BaseError(errors, err);
      }
    };
  };
}
