import axios from "axios";
import router from "../router";

export default function API(url, method, body, headers) {
  return new Promise((resolve, reject) => {
    axios[method]("/api" + url, body, headers)
      .then(resolve)
      .catch(async e => {
        if (e.response.status === 401) {
          await API("/user/logout", "get");
          localStorage.removeItem("user");
          router.push("/login");
        }
        reject(e);
      });
  });
}
