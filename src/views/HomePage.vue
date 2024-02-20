<template>
  <div class="header">
    <ul
      class="d-flex p-3 justify-content-around"
      style="background-color: #ccc"
    >
      <li><a href="/">Mua sắm</a></li>
      <li><a href="#">Giỏ hàng</a></li>
      <!--      <li class="d-flex justify-center align-items-center">-->
      <!--        <input-->
      <!--          class="bg-white p-2 border-right-0 rounded"-->
      <!--          type="search"-->
      <!--          name="keyword"-->
      <!--          v-model="this.keyword"-->
      <!--          placeholder="Search"-->
      <!--        />-->
      <!--        <v-btn color="success" type="submit" @click="search(this.keyword)">-->
      <!--          <i class="fa-solid fa-magnifying-glass"></i>-->
      <!--        </v-btn>-->
      <!--      </li>-->
      <li v-if="!this.username">
        <a href="/signup">Đăng ký </a>|
        <a href="/signin"> Đăng nhập</a>
      </li>
      <li v-else>
        <span>{{ this.username }}</span> |
        <v-btn variant="text" @click="signOut"> Đăng xuất</v-btn>
      </li>
    </ul>
  </div>

  <v-row>
    <v-col cols="2">
      <v-list-item
        v-for="category in categories"
        :key="category.id"
        style="border: 1px rgba(0, 0, 0, 0.125) solid; padding: 12px"
        class="category-title"
        :title="category.name"
        @click="productsInCategory(category.id)"
      >
      </v-list-item>
    </v-col>
    <v-col cols="10">
      <v-row>
        <v-col cols="3" v-for="product in products" :key="product.id">
          <v-card class="mx-auto" max-width="344">
            <div style="height: 200px"></div>

            <v-card-title> {{ product.name }} </v-card-title>

            <v-card-subtitle> {{ product.price }} </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <RouterLink :to="`/payment/${product.id}`">
                <v-btn variant="elevated" color="success">Mua hàng</v-btn>
              </RouterLink>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import AdminServices from "@/services/AdminServices";

export default {
  data: () => ({
    username: "",
    accessToken: "",
    categories: [],
    products: [],
    categoryId: "",
    productId: "",
    keyword: "",
  }),

  created() {
    this.accessToken = localStorage.getItem("accessToken");
    this.username = localStorage.getItem("username");
  },

  mounted() {
    this.getCategories();
    this.getProducts();
  },

  methods: {
    getCategories() {
      AdminServices.getAllCategories()
        .then(async (response) => {
          let categoriesWithProducts = [];

          for (let i = 0; i < response.data.content.length; i++) {
            const categoryId = response.data.content[i].id;

            const productsResponse = await AdminServices.getProductsByCategory(
              categoryId
            );

            if (productsResponse.data.length > 0) {
              categoriesWithProducts.push(response.data.content[i]);
            }
          }

          this.categories.push(...categoriesWithProducts);
        })
        .catch((e) => {
          console.error(e);
        });
    },

    getProducts() {
      AdminServices.getAllProducts()
        .then((response) => {
          this.products = response.data.content;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    productsInCategory(id) {
      this.$router.push(`/category/${id}/products`);
      AdminServices.getProductsByCategory(id).then((response) => {
        this.products = response.data;
      });
    },

    search(keyword) {
      this.$router.push(`/product/search?keyword=${keyword}`);
      AdminServices.search(keyword)
        .then((response) => {
          this.products = response.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    signOut() {
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("roles");
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.category-title {
  cursor: pointer;
}

.category-title:hover {
  text-decoration: none;
}
</style>
