import { App } from "vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import { useConfig } from "@/config";
import { RouterView } from "@/layout/helper";
import { LazyComponent } from "@/layout/page/lazy-component";

const config = useConfig();

// 这里不使用动态路由,有需要自行使用addRoute
const routes: RouteRecordRaw[] = [
  {
    path: `/:locale(${config.LANGUAGES.join("|")})?/`,
    component: RouterView,
    children: [
      {
        path: "",
        component: LazyComponent(() => import("@/views/home")),
      },
      {
        path: "/about",
        component: LazyComponent(() => import("@/views/about")),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(config.PUBLIC_PATH),
  routes,
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepAlive || to.fullPath === from.fullPath || to.meta.scrollToTop === false)
      return savedPosition || false;
    return { behavior: "smooth", top: 0, left: 0 };
  },
});

export function setupRouter(app: App) {
  app.use(router);

  return router;
}
