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

import React from 'react';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    sessionStorage.setItem('username',res.data.username);
    sessionStorage.setItem('userNameuid',res.data.uid);
    sessionStorage.setItem('userRole',res.data.isAdmin);
    sessionStorage.setItem('loginStatus',true);
    console.log(sessionStorage.userRole);
    console.log(res.data.isAdmin);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    sessionStorage.setItem('loginStatus',false);
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