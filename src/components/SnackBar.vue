<!-- Snackbar.vue -->
<template>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    location="top right"
  >
    {{ snackbar.message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" v-bind="attrs" @click="snackbar.show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        timeout: 6000,
        color: "error",
      },
    };
  },
  methods: {
    showSnackbarError(error) {
      this.snackbar.message =
        error.response.data.message || error.response.message;
      this.snackbar.show = true;
    },
  },
};
</script>
