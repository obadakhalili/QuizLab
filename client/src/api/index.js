import axios from "axios";
import router from "../router";
import store from "../store";

export default function API(url, method, body, headers) {
  return new Promise((resolve, reject) => {
    axios[method]("/api" + url, body, headers)
      .then(resolve)
      .catch(async e => {
        if (e.response.status === 401) {
          await API("/user/logout", "get");
          router.push("/login");
          return store.dispatch("updateAlerts", {
            message: "Not Authenticated",
            color: "danger"
          });
        }
        reject(e);
      });
  });
}
