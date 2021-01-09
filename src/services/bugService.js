import axios from "axios";

export const bugService = {
  newBug,
};

function newBug(desc, route, user) {
  const Bug = {
    desc: desc,
    route: route,
    user: user,
  };
  return axios
    .post(`/api/bugs/newBug`, Bug)
    .then((u) => u.data)
    .catch((e) => e);
}
