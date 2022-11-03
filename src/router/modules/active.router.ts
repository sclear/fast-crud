import { RouteRecordRaw } from "vue-router";

type RouteRaw = RouteRecordRaw & {
  activeMenu: string;
};

export const activeRoutes = [
  {
    path: "/detail",
    meta: {
      activeMenu: "/test",
      title: "主页详情",
    },
    component: () => import("@/views/homepage/index.vue"),
  },
];
