import React, {useState} from 'react'
import "./CSS/AddBook.css";
import UploadPic from "./UploadPic";
import Tilt from 'react-vanilla-tilt'
import {Link, Navigate} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import { addBook, deleteBook, getBooks } from "../redux/apiCalls";
import { useDispatch , useSelector} from "react-redux";


function DeleteBook() {

    if(localStorage.userRole === "notSet"){
        return <Navigate to="/login"/>
    }
    if(localStorage.userRole === "user")
    {
        return <Navigate to="/service"/>
    }

    const[product, setProduct] = useState([]);

    const { isFetching, error } = useSelector((state) => state.user);

    // DELETE BOOK

    const dispatch = useDispatch();

    // deleteBook(dispatch, { token: localStorage.acessToken, isAdmin:true, title: "BogdanTest30May", author: "test Bogdan", price: "555", desc: "test Bogdan", genre: "fantasy", img: "test", _id: "62950646e92978aaf94c0f1f"})

    // setProduct(getBooks(dispatch));
    // console.log(product);

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
                  <Link to="/editbook">Edit Book</Link>
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

export default DeleteBook;

