import axios from "axios";
// import router from "@/routers/router";
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       router.push("/403");
//     } else if (error.response && error.response.status === 401) {
//       router.push("/signin");
//     }
//     return Promise.reject(error);
//   }
// );
export default instance;
