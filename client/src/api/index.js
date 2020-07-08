import axios from "axios";
import store from "../store";
import { startLogoutProcess } from "@/helpers";

const baseRoute =
  "/api" + (process.env.NODE_ENV === "development" ? "" : "/v1");

export default function(url, method, body, headers) {
  return new Promise((resolve, reject) => {
    axios[method](baseRoute + url, body, headers)
      .then(resolve)
      .catch(async e => {
        if (e.response.status === 401) {
          await startLogoutProcess();
          return store.dispatch("updateAlerts", {
            message: "Not Authenticated",
            color: "danger"
          });
        }
        reject(e);
      });
  });
}
