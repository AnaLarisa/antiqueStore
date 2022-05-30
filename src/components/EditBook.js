import React, {useState} from 'react'
import "./CSS/AddBook.css";
import UploadPic from "./UploadPic";
import Tilt from 'react-vanilla-tilt'
import {Link, Navigate} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import { editBook } from "../redux/apiCalls";
import { useDispatch , useSelector} from "react-redux";


function EditBook() {

    if(localStorage.userRole === "notSet"){
        return <Navigate to="/login"/>
    }
    if(localStorage.userRole === "user")
    {
        return <Navigate to="/service"/>
    }


    const { isFetching, error } = useSelector((state) => state.user);

    // EDIT BOOK

    const dispatch = useDispatch();

    // editBook(dispatch, { token: localStorage.acessToken, isAdmin:true, title: "bogdan30MaiTestEdit", author: "testtest11", price: "555", desc: "testtest11", genre: "fantasy", img: "test11", _id: "6295069ee92978aaf94c0f24"})


    return (
        <div className="under">
          <div className="over">
            <div className="Navbar">
              <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
              <span className="nav-logo"><span>ANTIQUE</span><br/>
              <span>STORE</span></span>
              <div className={`nav-items`}>
                  <Link to ="/addbook">Add Book</Link>
                  <Link to ="/agent">Support</Link>
                  <Link to ="/deletebook">Delete Book</Link>
              </div>
              <div className={`nav-toggle`}>
                  <div className="bar"></div>
              </div>
            </div>
                <p></p>
                <div id="cometchat" style={{ margin: "0 auto", width: "60%" }}></div>
            </div>
          </div>
    );
}

export default EditBook;

