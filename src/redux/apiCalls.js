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
    localStorage.setItem('username',res.data.username);
    localStorage.setItem('userNameuid',res.data.uid);
    if(res.data.isAdmin == true)
      localStorage.setItem('userRole',"admin");
    else
      localStorage.setItem('userRole',"user");
    localStorage.setItem('loginStatus',true);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    localStorage.setItem('loginStatus',false);
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
    const resultJson = JSON.parse(res.data);
    console.log("test" + res.data);
    dispatch(getBookSuccess(res.data));
  } catch (err) {
    dispatch(getBookFailure());
  }
};

export const addBooks = async (dispatch, book) => {
  dispatch(addBookStart());
  try{
    const res = await publicRequest.get("/books/addBook", book);
    dispatch(addBookSuccess());
    console.log("added succesfully");
  }catch (err) {
    dispatch(addBookFailure());
  }
}