import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Explorer from "../views/Explorer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Explorer",
    component: Explorer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
