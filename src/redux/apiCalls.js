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
import { publicRequest, userRequest } from "../requestMethods";

import React from 'react';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    localStorage.setItem('username',res.data.username);
    localStorage.setItem('userNameuid',res.data.uid);
    localStorage.setItem('userEmail',res.data.email);
    localStorage.setItem('acessToken', res.data.accessToken);
    localStorage.setItem('_id',res.data._id);
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
    localStorage.setItem('registerStatus',true);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    localStorage.setItem('registerStatus',false);
    dispatch(registerFailure());
  }
};

export const getBooks = async (dispatch) => {
  dispatch(getBookStart());
  try {
    const res = await publicRequest.get("/books");
    const resultJson = JSON.stringify(res.data);
    console.log("apiCals " + resultJson);
    dispatch(getBookSuccess(res.data));
    return resultJson;
  } catch (err) {
    dispatch(getBookFailure());
  }
};

export const addBook = async (dispatch, book) => {
  dispatch(addBookStart());
  try{
    const res = await userRequest.post("/books/addBook", book);
    dispatch(addBookSuccess());
    console.log("added succesfully");
  }catch (err) {
    dispatch(addBookFailure());
  }
}

export const addCart = async (dispatch, cart) => {
  //dispatch(addBook());
  try{
    const res = await userRequest.post("/carts/addCart", cart);
    console.log("added to cart succesfully");
  }catch (err){
    console.log("could not add into cart");
  }
}

export const getCart = async (dispatch, user) => {
  try{
    const res = await userRequest.get("/carts/find/" + user.userId ,{data : {user} });
    console.log("cart :" + JSON.stringify(res.data));
    console.log("show cart succesfully");
  }catch (err){
    console.log("could not show cart");
  }
}

export const deleteCart = async (dispatch, user) => {
  console.log(JSON.stringify(user));
  try{
    const res = await userRequest.delete("/carts/" + user.id , { data: { id:user.id, bookId:user.bookId, cartId:user.cartId  }});
    console.log("cart deleted");
  }catch(err) {
    console.log("cart not deleted");
  }
}

export const deleteBook = async (dispatch, book) => {
  // console.log(JSON.stringify(book));
  try{
    const res = await userRequest.delete("/books/" + book._id , { data: { book, token: book.token, isAdmin: book.isAdmin }});
    console.log("book deleted");
  }catch(err) {
    console.log("book not deleted");
  }
}

export const editBook = async (dispatch, book) => {
  console.log(JSON.stringify(book));
  try{
    const res = await userRequest.put("/books/edit/" + book._id , book);
    console.log("book edited");
  }catch(err) {
    console.log("book not edited");
  }
}

export const getOnlyABook = async (dispatch, book) =>{
  console.log("bookId: " + JSON.stringify(book));
  try{
    const res = await userRequest.get("/books/find/"+ book.bookId, book);
    console.log("book returned " + JSON.stringify(res))
  }catch(err)
  {
    console.log("book not returned");
  }
}