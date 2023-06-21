import { createRouter, createWebHistory } from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailsPage from "./pages/ProductDetailsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import RegisterPage from "./pages/RegistrationPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminDashboardPage from "./pages/AdminDashboard.vue";
import AdminUpdateProductPage from "./pages/AdminUpdateProduct.vue";
const routes = [
  {
    path: "/cart",
    component: ShoppingCartPage,
  },
  {
    path: "/products",
    component: ProductsPage,
  },
  {
    path: "/products/:productId",
    component: ProductDetailsPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/admin",
    component: AdminDashboardPage,
  },
  {
    path: "/admin/product/:productId",
    component: AdminUpdateProductPage,
  },
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
