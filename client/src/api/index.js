import axios from "axios";
import router from "../router";
import store from "../store";

const baseRoute =
  "/api" + (process.env.NODE_ENV === "development" ? "" : "/v1");

export default function API(url, method, body, headers) {
  return new Promise((resolve, reject) => {
    axios[method](baseRoute + url, body, headers)
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
