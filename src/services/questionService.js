import axios from "axios";

export const questionService = {
  addProblem,
  getSet,
  getAllSets,
  getEditSet,
  editProblem,
  getContestSet
};

function addProblem(problem) {
    console.log(problem)
    return axios
    .post(`/api/problems/createSet`, problem)
    .then(u => u)
    .catch(e => e);
}
function editProblem(id,set) {
    const sendProblem = {
        id: id,
        set: set
      };
    return axios
    .put(`/api/problems/updateSet`, sendProblem)
    .then(u => u)
    .catch(e => e);
}

function getSet(creator, setName) {
    const sendProblem = {
      creator: creator,
      set: setName
    };
    return axios
      .post(`/api/problems/checkName`, sendProblem)
      .then((u) => u.data.available)
      .catch((e) => e);
  }
function getAllSets(creator) {
    const userSets = {
      creator: creator
    };
    return axios
      .post(`/api/problems/findAllSets`, userSets)
      .then((u) => u.data)
      .catch((e) => e);
  }


  function getEditSet(creator,id) {
    const userSets = {
      creator: creator,
      id:id
    };
    return axios
      .post(`/api/problems/findSet`, userSets)
      .then((u) => u.data[0])
      .catch((e) => e);
  }

  function getContestSet(id) {
    const userSets = {
      id:id
    };
    return axios
      .post(`/api/problems/findContestSet`, userSets)
      .then((u) => u.data[0])
      .catch((e) => console.log(e));
  }