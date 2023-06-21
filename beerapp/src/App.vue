<template>
  <div id="app">
    <NavBar :user="user" />
    <div class="page-wrap">
      <router-view :user="user" @setUser="setUser" ref="routerView" />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      this.$store.commit("setToken", token);
      this.$store.commit("setUser", JSON.parse(user));
      this.user = JSON.parse(user);
      this.$router.push("/products");
    }
  },
  methods: {
    setUser(user) {
      this.user = user;
    },
  },
  created() {
    this.$store.watch(
      (state) => state.user,
      (newUser) => {
        this.user = newUser;
      }
    );
  },
};
</script>
