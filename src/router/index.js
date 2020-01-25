import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/lists",
    name: "lists",
    component: () => import("../views/MyLists.vue")
  },
  {
    path: "/list/:id",
    name: "list",
    component: () => import("../views/List.vue")
  },
  {
    path: "/colist/:id",
    name: "list",
    component: () => import("../views/CoList.vue")
  },
  {
    path: "/colists",
    name: "colists",
    component: () => import("../views/CommunityLists.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

export default router;
