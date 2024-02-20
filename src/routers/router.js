import { createRouter, createWebHistory } from "vue-router";
import AppPage from "@/views/HomePage";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
import PaymentPage from "@/views/PaymentPage";
import AdminHome from "@/views/admin/AdminHome";
import AdminCategory from "@/views/admin/AdminCategory";
import AdminProduct from "@/views/admin/AdminProduct";
import AdminBill from "@/views/admin/AdminBill";
import Forbidden from "@/components/403Forbidden";
import NotFound from "@/components/NotFound";

const routes = [
  {
    path: "/",
    component: AppPage,
  },
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/category/:id/products",
    component: AppPage,
  },
  {
    path: "/product/search",
    component: AppPage,
  },
  {
    path: "/payment/:id",
    component: PaymentPage,
  },
  {
    path: "/admin",
    component: AdminHome,
  },
  {
    path: "/admin/category",
    component: AdminCategory,
  },
  {
    path: "/admin/product",
    component: AdminProduct,
  },
  {
    path: "/admin/bill",
    component: AdminBill,
  },
  {
    path: "/403",
    component: Forbidden,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/signin", "/signup", "/403"];
  const adminPages = [
    "/admin",
    "/admin/category",
    "/admin/product",
    "/admin/bill",
  ];
  const authRequired = !publicPages.includes(to.path);
  const adminRequired = adminPages.some((page) => to.path.startsWith(page));
  const loggedIn = localStorage.getItem("accessToken");

  if (authRequired && !loggedIn) {
    next("/signin");
  } else if (adminRequired) {
    let roles = JSON.parse(localStorage.getItem("roles"));
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ROLE_ADMIN") {
          next();
        } else {
          next("/403");
        }
      }
    }
  } else {
    next();
  }
});
export default router;
