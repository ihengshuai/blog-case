
declare const __DEV__: boolean;

interface Window {
  __DEV__: boolean;
  __DATE__: string;
}

// declare global {
//   interface  window{
//     __DEV__: boolean;
//     __DATE__: string;
//   }

//   const __VERSION__: string;
// }
declare function logger(msg: string): void;
declare type AA = string;

declare namespace Color {
  export const red: string;
  export const green: string;
  export const blue: string;
}

// export {};

declare module 'helper' {
  function add(a: number, b: number): number;
}

declare module 'jquery' {
  const $: (selector: string) => any;
}

import "vue";
declare module "vue" {
  interface AppConfig {
    readonly __APP_VERSION__: string;
  }

  const launch: () => void;
}
