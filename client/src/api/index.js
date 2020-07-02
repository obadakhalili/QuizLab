import axios from "axios";

function signup(body) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users", body)
      .then(({ data: name }) => {
        localStorage.setItem("name", name);
        resolve();
      })
      .catch(e => reject(e.response.data.errors));
  });
}

function login(body) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/login", body)
      .then(({ data: name }) => {
        localStorage.setItem("name", name);
        resolve();
      })
      .catch(e => reject(e.response.data));
  });
}

export default {
  signup,
  login
};
