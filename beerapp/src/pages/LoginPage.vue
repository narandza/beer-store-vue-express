<template>
  <div class="registration-page">
    <h1>Login</h1>
    <form @submit="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        const user = await this.$store.dispatch("loginUser", credentials);
        console.log("Logged in user:", user);
        toast.success("Login successful");
        this.$router.push("/products");
      } catch (error) {
        console.error("Error logging in user:", error);
        toast.error("Invalid credentials");
      }
    },
  },
};
</script>
