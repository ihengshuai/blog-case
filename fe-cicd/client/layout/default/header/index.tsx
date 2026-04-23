import {
  BellOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Avatar, Badge, Divider, Dropdown, Flex, Layout, Menu, theme } from "ant-design-vue";
import { defineComponent, toRefs } from "vue";

import { TransitionSlide } from "@/components/common/animation";
import IBreadcrumbComp from "@/components/common/breadcrumb";
import { IconMoon, IconSun, LangIcon } from "@/components/common/icon";
import { DIRECTION, PROJECT_LANGS } from "@/constants/common";
import { useFullScreen } from "@/hooks";
import { getAssetss, useNameSpace } from "@/util";

import IHistoryTag from "./history-tag";
import { useAppContext } from "../application";

const ns = useNameSpace("layout-header");
const wrapCls = ns.b();

const LayoutHeader = defineComponent({
  name: "Header",
  setup() {
    const appContext = useAppContext();
    const { toggleAppMode, appLanguages, setAppLocale } = appContext;
    const { isLightMode, appLocale, breadcrumbs, showNavigateTag } = toRefs(appContext);
    const { isFullScreen, toggleFullScreen } = useFullScreen();
    const { useToken } = theme;
    const { token } = useToken();

    const changeAppLang = (lang: PROJECT_LANGS) => {
      setAppLocale(lang);
      window.location.reload();
    };

    return () => (
      <Layout.Header
        prefixCls={wrapCls}
        style={{ background: token.value.colorBgBase }}
      >
        <Flex
          align="center"
          style={{ paddingInline: "12px" }}
        >
          {/* 面包屑 */}
          <Flex flex={1}>
            <IBreadcrumbComp items={breadcrumbs.value} />
          </Flex>

          {/* 右上角菜单 */}
          <ul class={`fx ${ns.e("action")}`}>
            {/* 消息 */}
            <li class={ns.e("action__item")}>
              <Badge
                dot
                class={ns.e("action__badge")}
              >
                <BellOutlined />
              </Badge>
            </li>

            <li
              class={ns.e("action__item")}
              onClick={() => toggleFullScreen()}
            >
              {isFullScreen.value ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </li>

            {/* 用户头像 */}
            <Dropdown
              placement="bottom"
              overlay={
                <Menu class="w-120">
                  <Menu.Item>
                    <UserOutlined /> 个人中心
                  </Menu.Item>
                  <Menu.Item>
                    <SettingOutlined /> 其他
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>
                    <LogoutOutlined /> 退出系统
                  </Menu.Item>
                </Menu>
              }
            >
              <li class={ns.e("action__item")}>
                <span class="fx fx-ac">
                  <Avatar
                    src={getAssetss("img/logo.png")}
                    size="small"
                  />
                  <span class="ml-6">ihengshuai</span>
                </span>
              </li>
            </Dropdown>

            {/* 语言设置 */}
            <Dropdown
              placement="bottom"
              trigger={"click"}
              overlay={
                <Menu
                  class="w-120"
                  selectedKeys={[appLocale.value]}
                >
                  {appLanguages.map(item => (
                    <Menu.Item
                      key={item.value}
                      onClick={() => changeAppLang(item.value)}
                    >
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <li class={ns.e("action__item")}>
                <LangIcon />
              </li>
            </Dropdown>

            {/* 主题切换 */}
            <li
              class={ns.e("action__item")}
              onClick={() => toggleAppMode()}
            >
              <TransitionSlide direction={DIRECTION.TOP}>
                {isLightMode.value ? (
                  <span
                    key="light-mode-btn"
                    class={ns.e("action__theme-btn")}
                  >
                    <IconSun fill={token.value.colorTextBase} />
                  </span>
                ) : (
                  <span
                    key="right-mode-btn"
                    class={ns.e("action__theme-btn")}
                  >
                    <IconMoon fill={token.value.colorTextBase} />
                  </span>
                )}
              </TransitionSlide>
            </li>
          </ul>
        </Flex>

        {/* 历史标签 */}
        {showNavigateTag.value && (
          <>
            <Divider style={{ margin: 0 }} />
            <IHistoryTag />
          </>
        )}
      </Layout.Header>
    );
  },
});

export default LayoutHeader;
