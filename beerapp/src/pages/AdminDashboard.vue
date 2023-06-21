<template>
  <div>
    <h1>Admin Dashboard</h1>
    <AdminProductsList :products="products" />
  </div>
</template>

<script>
import AdminProductsList from "../components/AdminProductsList.vue";
import axios from "axios";
import { checkAdminAuthorization } from "@/authorization";
export default {
  name: "AdminDashboardPage",
  components: {
    AdminProductsList,
  },
  data() {
    return {
      products: [],
    };
  },

  created() {
    checkAdminAuthorization.call(this);
    axios
      .get("/api/products")
      .then((response) => {
        const products = response.data.map((product) => ({
          ...product,
          image: `http://localhost:8000/${product.image}`,
        }));
        this.products = products;
      })
      .catch((error) => {
        console.error("Error retrieving products:", error);
      });
  },
};
</script>
