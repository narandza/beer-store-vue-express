import router from "./router";

export function redirectTo(path) {
  router.push(path);
}

export function checkAuthentication() {
  const token = localStorage.getItem("token");
  if (!token) {
    redirectTo("/login");
  }
}

export function checkAdminAuthorization() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) {
    redirectTo("/login");
  } else if (role !== "admin") {
    redirectTo("/products");
  }
}
