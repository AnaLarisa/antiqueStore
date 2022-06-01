import React, {useEffect, useState} from 'react'
import "./CSS/AddBook.css";
import UploadPic from "./UploadPic";
import {Link, Navigate} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import { addBook, deleteBook } from "../redux/apiCalls";
import { publicRequest, userRequest } from "../requestMethods";
import axios from 'axios';
import { useDispatch , useSelector} from "react-redux";


function DeleteBook() {
    const dispatch = useDispatch();


    if(localStorage.userRole === "notSet"){
        return <Navigate to="/login"/>
    }
    if(localStorage.userRole === "user")
    {
        return <Navigate to="/"/>
    }


    const[product, setProduct] = useState([]);

    const { isFetching, error } = useSelector((state) => state.user);

    deleteBook(dispatch, { token: localStorage.acessToken, isAdmin:true, _id: localStorage.bookId })


    return (
        <Navigate to="/adminbooks"/>
    );
}

export default DeleteBook;

