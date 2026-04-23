import { useConfig } from "@/config";
import { useAppStore } from "@/store";

const config = useConfig();

export function setupAppWorker() {
  const worker = new Worker(new URL("@/util/common/worker/update-version.worker.ts", import.meta.url));
  worker.addEventListener("message", (e: MessageEvent<{ type: string; data: any }>) => {
    const appVersion = e.data.data.version;
    if (appVersion) {
      if (appVersion !== config.__VERSION__) {
        const appStore = useAppStore();
        appStore.isAppVersioinChanged = true;
      }
    }
  });
}
