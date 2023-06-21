<template>
  <div>
    <div v-if="product">
      <ProductDetail :product="product" :user="user" />
    </div>
    <div v-else>
      <NotFoundPage />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductDetail from "@/components/ProductDetail.vue";
import NotFoundPage from "./NotFoundPage.vue";
import { checkAuthentication } from "@/authorization";

export default {
  name: "ProductDetailsPage",
  props: ["user"],
  data() {
    return {
      product: [],
    };
  },
  components: {
    NotFoundPage,
    ProductDetail,
  },
  async created() {
    checkAuthentication(this);
    axios
      .get(`/api/products/${this.$route.params.productId}`)
      .then((response) => {
        const product = response.data;
        this.product = product;

        this.product.image = `http://localhost:8000/${this.product.image}`;

        if (!this.product) {
          console.error("Product not found.");
        }
      })
      .catch((error) => {
        console.error("Error retrieving product:", error);
      });
  },
};
</script>
