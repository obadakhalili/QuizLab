import Vue from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, BIconList, BIconInfoCircle } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.component("BIconList", BIconList);
Vue.component("BIconInfoCircle", BIconInfoCircle);
