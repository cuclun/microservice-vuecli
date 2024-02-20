<template>
  <v-container style="width: 600px">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="user.username"
          name="username"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          v-model="user.password"
          name="password"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary text-white" type="submit">
          Đăng nhập
        </button>
        <router-link to="/signin" class="btn btn-link">Hủy</router-link>
      </div>
    </form>
  </v-container>

  <SnackBar ref="snackbarRef" />
</template>

<script>
import SnackBar from "@/components/SnackBar.vue";
import AdminServices from "@/services/AdminServices";
export default {
  components: {
    SnackBar,
  },

  data: () => ({
    accessToken: "",
    user: {
      username: "",
      password: "",
    },
  }),

  created() {
    this.accessToken = localStorage.getItem("accessToken");
    if (this.accessToken) {
      this.$router.push("/");
    }
  },

  methods: {
    signIn() {
      if (this.user.username.length === 0 || this.user.password.length === 0) {
        alert("Không được để trống");
        return;
      }
      AdminServices.signIn(this.user)
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("roles", JSON.stringify(response.data.roles));
          this.$router.push("/");
        })
        .catch((e) => {
          this.$refs.snackbarRef.showSnackbarError(e);
        });
    },
  },
};
</script>
