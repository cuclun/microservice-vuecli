<template>
  <v-container style="width: 600px">
    <h2>Đăng ký</h2>
    <form @submit.prevent="signUp">
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
        <label for="lastName">Email</label>
        <input
          type="text"
          v-model="user.email"
          name="lastName"
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
        <button type="submit" class="btn btn-primary text-white">
          Đăng ký
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
      email: "",
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
    signUp() {
      if (
        this.user.email.length === 0 ||
        this.user.username.length === 0 ||
        this.user.password.length === 0
      ) {
        alert("Không được để trống");
        return;
      }
      AdminServices.signUp(this.user)
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((e) => {
          this.$refs.snackbarRef.showSnackbarError(e);
        });
    },
  },
};
</script>
