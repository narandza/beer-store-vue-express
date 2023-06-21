<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo" alt="logo" class="logo" />
      </div>
    </router-link>
    <div class="nav-buttons-wrap">
      <span class="documentation"
        ><a href="/beerapp/src/data/dokumentacija.pdf" target="_blank" download
          >Documentation</a
        ></span
      >
      <span class="user-greeting" v-if="user"> Hello {{ user.name }} </span>
      <router-link to="/admin" v-if="isAdmin">
        <button class="admin-dashboard">Admin Dashboard</button>
      </router-link>
      <router-link to="/cart">
        <button class="shopping-cart" v-if="user">Shopping Cart</button>
      </router-link>
      <button @click="signOut" v-if="user" class="sign-out">Sign Out</button>
      <router-link to="/login" v-if="!user">
        <button class="sign-in">Sign In</button>
      </router-link>
      <router-link to="/register" v-if="!user">
        <button class="sign-in">Register</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo.png";
import { mapActions } from "vuex";

export default {
  name: "NavBar",
  props: ["user"],
  data() {
    return {
      logo,
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.role === "admin";
    },
  },
  methods: {
    ...mapActions(["logoutUser"]),

    signOut() {
      this.logoutUser()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    },
  },
};
</script>
