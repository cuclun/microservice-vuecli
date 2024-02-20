import { createApp } from "vue";
import App from "@/App";

import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap/dist/css/bootstrap.css";
import "@/assets/css/style.css";

import router from "@/routers/router";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(VueAxios, axios);
app.mount("#app");
