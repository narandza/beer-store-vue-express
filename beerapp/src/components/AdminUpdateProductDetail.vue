<template>
  <div>
    <h1>Update Product</h1>
    <form>
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="updatedProduct.name"
          :placeholder="product.name"
        />
      </div>
      <div>
        <label for="price">Price:</label>
        <input
          type="text"
          id="price"
          v-model="updatedProduct.price"
          :placeholder="product.price"
        />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="updatedProduct.description"
          :placeholder="product.description"
        ></textarea>
      </div>
      <button @click="updateProduct">Update</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import { checkAdminAuthorization } from "@/authorization";
import "vue3-toastify/dist/index.css";

export default {
  name: "AdminUpdateProductDetail",
  props: ["product"],
  data() {
    return {
      updatedProduct: {
        name: "",
        price: "",
        description: "",
      },
    };
  },
  created() {
    checkAdminAuthorization(this);
  },

  methods: {
    updateProduct() {
      if (!this.updatedProduct.name) {
        this.updatedProduct.name = this.product.name;
      }
      if (!this.updatedProduct.price) {
        this.updatedProduct.price = this.product.price;
      }
      if (!this.updatedProduct.description) {
        this.updatedProduct.description = this.product.description;
      }

      axios
        .put(`/api/products/${this.product.id}`, this.updatedProduct)
        .then(() => {
          toast.success("Product updated successfully");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input[type="text"],
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.textarea-input {
  height: 300px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}
</style>
