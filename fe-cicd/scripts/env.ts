import dotenv from "dotenv";
import { resolvePath } from "./util";
import { EnvConfig } from "./type";

export const __isDev__ = process.env.NODE_ENV === "development";

const parsedConfig =
  dotenv.config({
    path: __isDev__ ? resolvePath(".env") : resolvePath(".env.production"),
    override: true,
  })?.parsed || ({} as any);

export const envConfig: EnvConfig = {
  ...parsedConfig,
  __isDev__,
  VERSION: uuid(),
  VITE_BASE_URL: parsedConfig.VITE_BASE_URL || "/",
  BUNDLE_ANALYZER: parsedConfig.BUNDLE_ANALYZER === "true",
  CLIENT_OUTDIR: parsedConfig.CLIENT_OUTDIR || "dist/client",
};

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
