// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home") // 동적 import
  },
  {
    path: "/detail/:id",
    name: "Detail",
    props: true,
    component: () => import("@/pages/Detail")
  },
  {
    path: "/external_detail/:id",
    name: "ExternalDetail",
    props: true,
    component: () => import("@/pages/ExternalDetail")
  },
  {
    path: "/Calendartest",
    name: "Calendartest",
    props: true,
    component: () => import("@/pages/Calendartest")
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
