import axios from "axios";

export const contestService = {
  addContest,
  loadMath,
  newParticipant,
  verifyCode,
  autosave,
  finish,
  getParticipants,
  getResults,
  deleteSubmission,
  deleteParticipant,
  publicResults,
  publicContest,
  getAllContests,
  removeContest,
  searchContests,
};
function searchContests() {
  return axios
    .get(`/api/contests/searchAllContests`)
    .then((u) => u.data)
    .catch((e) => e);
}
function removeContest(contest) {
  console.log(contest);
  return axios
    .delete(`/api/contests/${contest}`)
    .then((u) => u)
    .catch((e) => e);
}
function getAllContests(creator) {
  const userSets = {
    creator: creator,
  };
  return axios
    .post(`/api/contests/findAllContests`, userSets)
    .then((u) => u.data)
    .catch((e) => e);
}

function addContest(contest) {
  console.log(contest);
  return axios
    .post(`/api/contests/createContest`, contest)
    .then((u) => u)
    .catch((e) => e);
}

function loadMath(id) {
  const Apackage = {
    id: id,
  };
  return axios
    .post(`/api/contests/findContest`, Apackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function newParticipant(participant, contestID) {
  const Bpackage = {
    newPartic: participant,
    contestID: contestID,
  };
  console.log("hellooooo");
  return axios
    .put(`/api/contests/addPartic`, Bpackage)
    .then((u) => console.log(u.data))
    .catch((e) => console.log(e));
}

function verifyCode(userID, setID) {
  const Bpackage = {
    userID: userID,
    setID: setID,
  };
  return axios
    .post(`/api/contests/verifyCode`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function autosave(userID, contestID, answers) {
  const Bpackage = {
    userID: userID,
    contestID: contestID,
    answers: answers,
  };
  return axios
    .post(`/api/contests/autosave`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function finish(userID, contestID) {
  const Bpackage = {
    userID: userID,
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/finish`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function getParticipants(userID, contestID) {
  const Bpackage = {
    userID: userID,
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/getParticipants`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function getResults(contestID) {
  const Bpackage = {
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/getResults`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function publicContest(contestID) {
  const Bpackage = {
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/publicContest`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}
function publicResults(contestID) {
  const Bpackage = {
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/publicResults`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}

function deleteSubmission(userID, contestID) {
  const Bpackage = {
    userID: userID,
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/deleteSubmission`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}
function deleteParticipant(userID, contestID) {
  const Bpackage = {
    userID: userID,
    contestID: contestID,
  };
  return axios
    .post(`/api/contests/deleteParticipant`, Bpackage)
    .then((u) => u.data)
    .catch((e) => e);
}
