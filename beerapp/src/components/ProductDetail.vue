<template>
  <div class="">
    <div class="img-wrap">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">${{ product.price }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <button @click="addToCart" class="add-to-cart" v-if="!itemIsInCart">
        Add to cart
      </button>
      <button class="grey-button" v-if="itemIsInCart">
        Item is already in cart
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ProductDetail",
  props: ["product", "user"],
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    async addToCart() {
      const productId = parseInt(this.$route.params.productId);
      axios
        .post(`/api/users/${this.user.id}/cart`, { productId })
        .then(() => {
          toast.success("Item Added to Cart");
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    },
  },
  async created() {
    if (this.user) {
      axios.get(`/api/users/${this.user.id}/cart`).then((response) => {
        const cartItems = response.data;
        this.cartItems = cartItems;
      });
    }
  },
  computed: {
    itemIsInCart() {
      const productId = parseInt(this.$route.params.productId);
      return this.cartItems.some((item) => item.id === productId);
    },
  },
};
</script>
