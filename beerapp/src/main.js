import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import router from "./router";
import store from "./store";
import axios from "axios";
import {
  checkAuthentication,
  checkAdminAuthorization,
} from "@/authorization.js";

axios.defaults.baseURL = "http://localhost:8000";
checkAuthentication();
checkAdminAuthorization();

createApp(App).use(router).use(store).mount("#app");
