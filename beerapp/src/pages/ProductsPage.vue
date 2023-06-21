<template>
  <div class="">
    <h1>Products</h1>
    <ProductsList :products="products" />
  </div>
</template>

<script>
import axios from "axios";
import ProductsList from "@/components/ProductsList.vue";
import { checkAuthentication } from "@/authorization";
export default {
  name: "ProductsPage",
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    checkAuthentication();
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
