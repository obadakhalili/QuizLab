import API from "@/api";
import store from "@/store";
import router from "@/router";

export function findCookie(name) {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  return cookies
    .find(cookie => cookie.startsWith(name))
    ?.slice(name.length + 1);
}

export async function startLogoutProcess() {
  await API("/users/logout", "get");
  store.dispatch("updateUserInfo", {});
  router.push("/login");
}
