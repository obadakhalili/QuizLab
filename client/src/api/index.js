import axios from "axios";
import store from "../store";
import { startLogoutProcess } from "@/helpers";

const baseRoute =
  "/api" + (process.env.NODE_ENV === "development" ? "" : "/v1");

export default function(url, method, body) {
  return new Promise((resolve, reject) => {
    axios[method](baseRoute + url, body)
      .then(resolve)
      .catch(async e => {
        if (e.response.status === 401 || e.response.status === 500) {
          await startLogoutProcess();
          return store.dispatch("updateAlerts", {
            message: e.response.data,
            color: "danger"
          });
        }
        reject(e);
      });
  });
}
