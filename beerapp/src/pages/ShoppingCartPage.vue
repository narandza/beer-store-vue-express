<template>
  <div class="">
    <h1>My Cart</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList
        @remove-from-cart="removeFromCart($event)"
        :products="cartItems"
      />
      <p class="cart-total">Total: ${{ cartTotal }}</p>
      <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems.length == 0">
      <p>You currently have no items in your cart</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShoppingCartList from "@/components/ShoppingCartList.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { checkAuthentication } from "@/authorization";

export default {
  name: "ShoppingCartPage",
  props: ["user"],
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    async removeFromCart(productId) {
      axios
        .delete(`/api/users/${this.user.id}/cart/${productId}`)
        .then((response) => {
          const updatedCart = response.data.map((product) => ({
            ...product,
            image: `http://localhost:8000/${product.image}`,
          }));
          this.cartItems = updatedCart;
          toast.success("Product removed from cart");
        })
        .catch((error) => {
          console.error(error);
          this.$snotify.error("Failed to remove product from cart", "Error");
        });
    },
  },
  async created() {
    checkAuthentication.call(this);
    if (this.user) {
      axios
        .get(`/api/users/${this.user.id}/cart`)
        .then((response) => {
          const cartItems = response.data.map((product) => ({
            ...product,
            image: `http://localhost:8000/${product.image}`,
          }));
          this.cartItems = cartItems;
        })
        .catch((error) => {
          console.error("Error retrieving products:", error);
        });
    }
  },
  computed: {
    cartTotal() {
      const total = this.cartItems.reduce(
        (total, item) => total + parseFloat(item.price || 0),
        0
      );
      return total.toFixed(2);
    },
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        axios.get(`/api/users/${newUserValue.id}/cart`).then((response) => {
          const cartItems = response.data;
          this.cartItems = cartItems;
        });
      }
    },
  },
};
</script>
