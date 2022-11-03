import { defineStore } from "pinia";
import { asyncRoutes, wrapRoutes } from "@/router/modules/async.router";
import { activeRoutes } from "@/router/modules/active.router";
import router from "@/router";

interface MenuItem {
  path: string;
  icon: string;
  title: string;
  children?: MenuItem[];
}

interface Tab {
  path: string;
  query: any;
  title: string;
  name: string;
}

interface SettingState {
  tabs: Tab[];
  currentTab: string;
  menus: MenuItem[];
}

const defaultTab = {
  path: "/homepage",
  query: {},
  title: "主页",
  name: "/homepage",
};

export const useSetting = defineStore<string, SettingState, any, any>(
  "setting",
  {
    state: () => ({
      // tabs
      tabs: [defaultTab],
      // current tab
      currentTab: "/homepage",

      // menus
      menus: [
        {
          title: "主页",
          icon: "",
          path: "/homepage",
          name: "/homepage",
        },
        {
          title: "一级菜单",
          icon: "",
          path: "tem",
          children: [
            {
              title: "test",
              icon: "",
              path: "/test",
              name: "/test",
            },
          ],
        },
      ],

      // token
      token: "xxx",
    }),

    getters: {
      flatMenu(state: SettingState): any[] {
        const menus: MenuItem[] = [];
        function findTab(menu: MenuItem[]) {
          menu.forEach((item) => {
            if (item.children && item.children.length) {
              findTab(item.children);
            } else {
              menus.push({
                ...item,
              });
            }
          });
        }
        findTab(state.menus);
        return menus;
      },
    },

    actions: {
      addTab(tab: Tab) {
        const isRepetition = this.tabs.some((item: Tab) => {
          if (item.path === tab.path) {
            this.currentTab = tab.name;
            item.query = tab.query;
          }
          return item.path === tab.path;
        });
        if (isRepetition) return;
        this.tabs.push(tab);
        this.currentTab = tab.name;
      },
      removeTab(targetName: string) {
        // 检测禁删最后一项
        if (this.tabs.length === 1) return;

        const tabs = this.tabs;

        let activeName = this.currentTab;

        this.tabs = this.tabs.filter((tab: Tab, index: number) => {
          if (tab.path === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              router.push({
                path: nextTab.path,
                query: nextTab.query,
              });
            }
          }
          return tab.path !== targetName;
        });

        this.currentTab = activeName;
      },
      // 设置菜单
      setMenu(menus: any[]) {
        this.menus = menus;
      },

      // register route
      registerRoute() {
        return new Promise((resolve, reject) => {
          resolve(wrapRoutes([...activeRoutes, ...asyncRoutes]));
        });
      },
    },

    persist: {
      enabled: true,
    },
  }
);
