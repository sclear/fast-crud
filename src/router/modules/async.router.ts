import { RouteRecordRaw } from "vue-router";

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/homepage",
    meta: {
      title: "主页",
    },
    component: () => import("@/views/homepage/index.vue"),
  },
  {
    path: "/test",
    meta: {
      title: "test",
    },
    component: () => import("@/views/test/index.vue"),
  },
  {
    path: "/form",
    meta: {
      title: "Form",
    },
    component: () => import("@/views/form/index.vue"),
  },
  {
    path: "/dialog",
    meta: {
      title: "Dialog",
    },
    component: () => import("@/views/dialog/index.vue"),
  },
  {
    path: "/table",
    meta: {
      title: "Table",
    },
    component: () => import("@/views/table/index.vue"),
  },
];

export function wrapRoutes(children: RouteRecordRaw[]): RouteRecordRaw {
  return {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/Layout/index.vue"),
    children,
  };
}
