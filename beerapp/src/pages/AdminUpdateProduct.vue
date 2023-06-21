<template>
  <div>
    <div v-if="product">
      <AdminUpdateProductDetail :product="product" :user="user" />
    </div>
    <div v-else>
      <NotFoundPage />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminUpdateProductDetail from "@/components/AdminUpdateProductDetail.vue";
import NotFoundPage from "./NotFoundPage.vue";
import { checkAdminAuthorization } from "@/authorization";

export default {
  name: "AdminUpdateProductPage",
  props: ["user"],
  data() {
    return {
      product: [],
    };
  },
  components: {
    NotFoundPage,
    AdminUpdateProductDetail,
  },
  async created() {
    checkAdminAuthorization(this);
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
