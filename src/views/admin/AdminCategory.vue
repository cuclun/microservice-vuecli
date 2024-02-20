<template>
  <div>
    <h1>Quản lý danh mục</h1>
    <NavigationAdmin />

    <v-container>
      <v-btn color="success" class="float-right" @click="dialog = true"
        >Thêm mới</v-btn
      >
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ titleForm }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="editCategory.name"
                    label="Category name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="close()"> Close </v-btn>
            <v-btn variant="text" @click="save()"> Save </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" width="600px">
        <v-card>
          <v-card-title>Chắc chưa</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="closeDelete"> Chưa </v-btn>
            <v-btn variant="text" @click="deleteConfirm"> Chắc </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        v-model:items-length="totalItems"
        :headers="headers"
        :items="categories"
        :loading="loading"
        @update:options="getCategories"
      >
        <template v-slot:[`item.id`]="item">
          {{ this.itemsPerPage * (this.page - 1) + item.index + 1 }}
        </template>

        <template v-slot:[`item.actions`]="item">
          <v-icon
            size="small"
            color="info"
            class="me-2"
            @click="updateCategory(item.index, item.item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            color="danger"
            @click="deleteCategory(item.index, item.item.id)"
          >
            mdi-delete</v-icon
          >
        </template>
      </v-data-table-server>
    </v-container>

    <SnackBar ref="snackbarRef" />
  </div>
</template>
<script>
import NavigationAdmin from "@/layouts/NavigationAdmin.vue";
import AdminServices from "@/services/AdminServices";
import SnackBar from "@/components/SnackBar.vue";
export default {
  components: {
    NavigationAdmin,
    SnackBar,
  },
  data: () => ({
    page: 1,
    itemsPerPage: 5,
    totalItems: 10,
    loading: true,
    userAdmin: "",
    headers: [
      { title: "ID", key: "id", align: "center", sortable: false },
      { title: "Name", key: "name", align: "center", sortable: false },
      { title: "Actions", key: "actions", align: "center", sortable: false },
    ],
    categories: [],
    dialog: false,
    dialogDelete: false,
    editCategoryIndex: -1,
    categoryId: "",
    editCategory: {
      name: "",
    },
    categoryDefault: {
      name: "",
    },
  }),
  computed: {
    titleForm() {
      return this.editCategoryIndex !== -1 ? "Edit Category" : "Add Category";
    },
  },
  watch: {
    dialog(newValue) {
      if (!newValue) {
        this.close();
      }
    },
    dialogDelete(newValue) {
      if (!newValue) {
        this.closeDelete();
      }
    },
  },
  methods: {
    getCategories() {
      this.loading = true;
      let param = {
        page: this.page,
        size: this.itemsPerPage,
      };
      if (param.size > 0) {
        AdminServices.getCategories(param)
          .then((response) => {
            this.categories = response.data.content;
            this.totalItems = response.data.totalElements;
            this.loading = false;
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        AdminServices.getAllCategories()
          .then((response) => {
            this.categories = response.data.content;
            this.totalItems = response.data.totalElements;
            this.loading = false;
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editCategory = Object.assign({}, this.categoryDefault);
        this.editCategoryIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editCategory = Object.assign({}, this.categoryDefault);
        this.editCategoryIndex = -1;
      });
    },

    updateCategory(index, id) {
      this.dialog = true;
      this.editCategoryIndex = index;
      this.categoryId = id;
      this.editCategory = Object.assign({}, this.categories.at(index));
    },

    deleteCategory(index, id) {
      this.dialogDelete = true;
      this.editCategoryIndex = index;
      this.categoryId = id;
    },

    deleteConfirm() {
      AdminServices.deleteCategory(this.categoryId)
        .then(() => {
          this.getCategories();
        })
        .catch((e) => {
          this.$refs.snackbarRef.showSnackbarError(e);
        })
        .finally(() => {
          this.dialogDelete = false;
        });
    },

    async save() {
      if (this.editCategory.name.trim().length === 0) {
        alert("Không được để trống");
        return;
      }
      if (this.editCategoryIndex !== -1) {
        try {
          await AdminServices.editCategory(this.categoryId, this.editCategory);
          this.getCategories();
        } catch (e) {
          this.$refs.snackbarRef.showSnackbarError(e);
        }
      } else {
        try {
          const response = await AdminServices.addCategory(this.editCategory);
          if (response.status === 200) {
            this.getCategories();
          }
        } catch (e) {
          this.$refs.snackbarRef.showSnackbarError(e);
        }
      }
      this.close();
    },
  },

  mounted() {
    this.getCategories();
  },
};
</script>
