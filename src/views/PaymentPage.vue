<template>
  <v-container>
    <h1>Điền thông tin</h1>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="5">TÊN SẢN PHẨM: </v-col>
          <v-col v-model="newBill.productId" cols="7">{{ product.name }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="newBill.fullName"
              label="Họ và tên*"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="newBill.address"
              label="Địa chỉ*"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="newBill.phone"
              label="Số điện thoại*"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="newBill.quantity"
              label="Số lượng*"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4"><h4>Tổng tiền</h4></v-col>
          <v-col cols="8">
            <h4>
              {{ newBill.quantity > 0 ? newBill.quantity * product.price : 0 }}
            </h4>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" variant="elevated" @click="addBill"
          >ĐẶT HÀNG</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>

  <SnackBar ref="snackbarRef" />
</template>

<script>
import AdminServices from "@/services/AdminServices";
import SnackBar from "@/components/SnackBar.vue";

export default {
  components: {
    SnackBar,
  },

  data: () => ({
    productId: "",
    product: {},
    newBill: {
      fullName: "",
      phone: "",
      address: "",
      productId: "",
      quantity: "",
    },
  }),

  created() {
    this.productId = this.$route.params.id;
  },

  mounted() {
    this.getProductById();
  },

  methods: {
    getProductById() {
      AdminServices.getProductById(this.productId).then((response) => {
        this.product = response.data;
      });
    },

    addBill() {
      this.newBill.productId = this.product.id;
      if (
        this.newBill.fullName.trim().length === 0 ||
        this.newBill.phone.trim().length === 0 ||
        this.newBill.address.trim().length === 0 ||
        this.newBill.quantity.trim().length === 0
      ) {
        alert("Không được để trống cái mô hết trơn á");
        return;
      } else {
        AdminServices.addBill(this.newBill)
          .then(() => {
            this.$router.push("/");
          })
          .catch((e) => {
            this.$refs.snackbarRef.showSnackbarError(e);
          });
      }
    },
  },
};
</script>

<style scoped></style>
