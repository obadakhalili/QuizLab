import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faFeather,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars);
library.add(faFeather);
library.add(faSignOutAlt);
library.add(faUserCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
