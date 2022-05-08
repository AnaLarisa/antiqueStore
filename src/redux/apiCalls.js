import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { registerStart, registerSuccess, registerFailure } from "./newUserRedux";
import {
  getBookStart,
  getBookSuccess,
  getBookFailure,
  deleteBookStart,
  deleteBookSuccess,
  deleteBookFailure,
  updateBookStart,
  updateBookSuccess,
  updateBookFailure,
  addBookStart,
  addBookSuccess,
  addBookFailure,
} from "./productRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const getBooks = async (dispatch) => {
  dispatch(getBookStart());
  try {
    const res = await publicRequest.get("/books");
    dispatch(getBookSuccess(res.data));
  } catch (err) {
    dispatch(getBookFailure());
  }
};