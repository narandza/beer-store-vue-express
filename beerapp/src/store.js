import { createStore } from "vuex";
import axios from "axios";

const USER_KEY = "user";
const ROLE_KEY = "role";
const TOKEN_KEY = "token";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem(USER_KEY)),
    token: localStorage.getItem(TOKEN_KEY),
    role: localStorage.getItem(ROLE_KEY),
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.role = user ? user.role : null;
      localStorage.setItem(ROLE_KEY, user ? user.role : null);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    removeUser(state) {
      state.user = null;
      state.role = null;
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ROLE_KEY);
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  actions: {
    async registerUser({ commit }, userData) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          userData
        );
        const newUser = response.data;
        commit("setUser", newUser);
        return newUser;
      } catch (error) {
        console.error("Error registering user:", error);
        throw error;
      }
    },
    async loginUser({ commit }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          credentials
        );
        const { token, user } = response.data;
        commit("setToken", token);
        commit("setUser", user);
        return user;
      } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
      }
    },
    logoutUser({ commit }) {
      commit("removeUser");
      commit("removeToken");
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return state.user !== null && state.token !== null;
    },
    isAdmin: (state) => {
      return state.role === "admin";
    },
  },
});
