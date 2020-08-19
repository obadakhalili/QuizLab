import Vue from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, BIconList, BIconArrowRightShort } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.component("BurgerIcon", BIconList);
Vue.component("RightArrow", BIconArrowRightShort);
