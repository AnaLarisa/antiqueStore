import axios from "axios";

const BASE_URL = "http://localhost:2000";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWE0MDBmOTdmOTg3MjRjMDQ1MjA5NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTUxMzk0OCwiZXhwIjoxNjQxNzczMTQ4fQ.9pX8nFfflqCG9sUKwxeid5wOHM7m1sLZJ5z88EbYujo";
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
    header: { token: `Bearer ${TOKEN}` },
});
