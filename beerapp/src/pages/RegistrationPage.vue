<template>
  <div class="registration-page">
    <h1>Registration</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
        <div class="email-validation" v-if="!isEmailValid">
          Please enter a valid email address.
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <div class="password-validation" v-if="!isPasswordValid">
          Password must contain at least one lowercase letter, one uppercase
          letter, one number, one symbol, and be at least 7 characters long.
        </div>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isPasswordValid() {
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/;
      return passwordRegex.test(this.password);
    },
  },
  methods: {
    async register() {
      try {
        if (!this.isEmailValid) {
          toast.error("Invalid email address. Please enter a valid email.");
          return;
        }

        if (!this.isPasswordValid) {
          toast.error("Invalid password. Please check the requirements.");
          return;
        }

        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        await this.$store.dispatch("registerUser", userData);

        toast.success("Registration successful");

        this.name = "";
        this.email = "";
        this.password = "";

        const credentials = {
          email: userData.email,
          password: userData.password,
        };

        await this.$store.dispatch("loginUser", credentials);

        this.$router.push("/products");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
  },
};
</script>

<style>
.password-validation {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.email-validation {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
