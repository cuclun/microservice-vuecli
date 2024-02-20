<template>
  <div>
    <h1>Quản lý đơn hàng</h1>

    <NavigationAdmin />

    <v-container>
      <v-dialog v-model="dialogDelete" width="600px">
        <v-card>
          <v-card-title>Chắc chưa?</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="closeDelete()"> Chưa </v-btn>
            <v-btn variant="text" @click="deleteConfirm()"> Chắc </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table :headers="headers" :items="bills">
        <template v-slot:[`item.id`]="item">
          {{ item.index + 1 }}
        </template>

        <template v-slot:[`item.action`]="item">
          <v-icon
            size="small"
            color="danger"
            @click="deleteBill(item.index, item.item.id)"
          >
            mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import NavigationAdmin from "@/layouts/NavigationAdmin.vue";
import AdminServices from "@/services/AdminServices";
export default {
  components: {
    NavigationAdmin,
  },
  data: () => ({
    userAdmin: "",
    headers: [
      { title: "ID", key: "id", align: "center", sortable: false },
      { title: "FullName", key: "fullName", align: "center", sortable: false },
      { title: "Phone", key: "phone", align: "center", sortable: false },
      { title: "Address", key: "address", align: "center", sortable: false },
      {
        title: "Product",
        key: "productResponse.name",
        align: "center",
        sortable: false,
      },
      { title: "Quantity", key: "quantity", align: "center", sortable: false },
      { title: "Action", key: "action", align: "center", sortable: false },
    ],
    bills: [],
    dialogDelete: false,
    billId: "",
    billIndex: "",
  }),

  methods: {
    getBills() {
      AdminServices.getBills()
        .then((response) => {
          this.bills = response.data.content;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    deleteBill(index, id) {
      this.dialogDelete = true;
      this.billIndex = index;
      this.billId = id;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    deleteConfirm() {
      AdminServices.deleteBill(this.billId)
        .then(() => {
          this.getBills();
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.dialogDelete = false;
        });
    },
  },

  mounted() {
    this.getBills();
  },
};
</script>
