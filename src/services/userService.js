import axios from "axios";
import router from "../router";

export const userService = {
  register,
  getUsernames,
  login,
  session,
  logout
};

function register(user) {
  axios
    .post(`/api/users/createAccount`, user)
    .then(function(u) {
      router.push("/");
      return u;
    })
    .catch(function(e) {
      router.push("/signup");
      return e;
    });
}

function getUsernames(username) {
  const sendUser = {
    username: username,
  };
  return axios
    .post(`/api/users/checkAccount`, sendUser)
    .then((u) => u.data.available)
    .catch((e) => e);
}

function login(user) {
  return axios
    .post(`/api/users/login`, user)
    .then((u) => u)
    .catch((e) => e);
}

function logout() {
  return axios
    .post(`/api/users/logout`)
    .then((u) => u)
    .catch((e) => e);
}

function session(){
    return axios
    .post(`/api/users/sessionAccount`)
    .then(u=> u.data)
    .catch(e=>e)
}