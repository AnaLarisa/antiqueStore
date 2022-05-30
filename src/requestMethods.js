import axios from "axios";

const HEROKU_URL = "https://backendantiquestore.herokuapp.com";
const BASE_URL = "http://localhost:2000";
const TOKEN = localStorage.acessToken;
// console.log("token from requestMethods " + TOKEN);
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

//const user = JSON.parse(localStorage.getItem("persist:root")).user;
//const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});
