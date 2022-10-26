import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, left: 0 }),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/layout",
      name: "layout",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "/homepage",
          component: () => import("@/views/homepage/index.vue"),
        },
      ],
    },
  ],
});
export default router;
