import axios from "axios";

const API = {};

// users API routes

API.login = body => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/login", body)
      .then(({ data: name }) => {
        localStorage.setItem("name", name);
        resolve();
      })
      .catch(reject);
  });
};

API.logout = () => {
  return new Promise(resolve => {
    axios.get("/api/user/logout").then(resolve);
  });
};

API.signup = body => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user", body)
      .then(({ data: name }) => {
        localStorage.setItem("name", name);
        resolve();
      })
      .catch(reject);
  });
};

API.getAccount = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/user")
      .then(resolve)
      .catch(reject);
  });
};

API.updateAccount = body => {
  return new Promise((resolve, reject) => {
    axios
      .patch("/api/user", body)
      .then(resolve)
      .catch(reject);
  });
};

API.deleteAccount = body => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/api/user", body)
      .then(resolve)
      .catch(reject);
  });
};

API.updateAvatar = avatar => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/avatar", avatar, {
        "Content-Type": "multipart/form-data"
      })
      .then(resolve)
      .catch(reject);
  });
};

API.deleteAvatar = () => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/api/user/avatar")
      .then(resolve)
      .catch(reject);
  });
};

export default API;
