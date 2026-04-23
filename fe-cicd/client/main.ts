import { createApp, h } from "vue";

import { setupI18n, setupAppWorker } from "@/util";

import App from "./App";
import AppProvider from "./layout/default/application";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import "@/style/index.less";
import "virtual:uno.css";

async function bootstrap() {
  const app = createApp(h(AppProvider, () => h(App)));

  await setupI18n(app);

  await setupStore(app);

  await setupRouter(app);

  setupAppWorker();

  app.mount("#app");
}

try {
  bootstrap();
} catch (error) {
  console.log(error);
}
