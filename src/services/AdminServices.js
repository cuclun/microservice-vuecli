import http from "@/http-common";
function authHeader() {
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}

class AdminServices {
  signUp(data) {
    return http.post("/user/signup", data);
  }

  signIn(data) {
    return http.post("/user/signin", data);
  }
  getCategories(param) {
    return http.get(`/category?page=${param.page}&size=${param.size}`, {
      headers: authHeader(),
    });
  }
  getAllCategories() {
    return http.get(`/category?size=all`, { headers: authHeader() });
  }

  addCategory = async (data) => {
    return http.post("/category/", data, { headers: authHeader() });
  };

  editCategory(id, data) {
    return http.put(`/category/${id}`, data, { headers: authHeader() });
  }

  deleteCategory(id) {
    return http.delete(`/category/${id}`, { headers: authHeader() });
  }

  getProducts(param) {
    return http.get(
      `/product?page=${param.page}&size=${
        param.size === -1 ? "all" : param.size
      }&keyword=${param.keyword}`,
      { headers: authHeader() }
    );
  }

  getAllProducts() {
    return http.get(`/product?size=all`, { headers: authHeader() });
  }

  addProduct = (data) => {
    return http.post("/product/", data, { headers: authHeader() });
  };

  editProduct(id, data) {
    return http.put(`/product/${id}`, data, { headers: authHeader() });
  }

  deleteProduct(id) {
    return http.delete(`/product/${id}`, { headers: authHeader() });
  }

  getProductsByCategory(id) {
    return http.get(`/category/${id}/products`, { headers: authHeader() });
  }

  getBills() {
    return http.get("/bill", { headers: authHeader() });
  }

  getProductById(id) {
    return http.get(`/product/${id}`, { headers: authHeader() });
  }

  addBill(data) {
    return http.post("/bill", data, { headers: authHeader() });
  }

  deleteBill(id) {
    return http.delete(`/bill/${id}`, { headers: authHeader() });
  }

  search(keyword) {
    return http.get(`/product/search?keyword=${keyword}`, {
      headers: authHeader(),
    });
  }
}

export default new AdminServices();
