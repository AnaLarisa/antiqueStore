import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css'; 
import "./CSS/Navbar.css";
import "./CSS/BookDetails.css";
import profile from "./images/1.png"
import settings from "./images/setting.png"
import { TiDelete } from "react-icons/ti";
import { useDispatch , useSelector} from "react-redux";
import { publicRequest, userRequest } from "../requestMethods";

import {Popup3} from './Popup';

function BookDetails() {
    const [bookTitle, setBookTitle] = useState(" ");
    const [bookAuthor, setBookAuthor] = useState(" ");
    const [desc, setDesc] = useState(" ");
    const [img, setImg] = useState(" ");
    const [genre, setGenre] = useState(" ");
    const [price, setPrice] = useState(" ");

    const dispatch = useDispatch();

    // getOnlyABook(dispatch, { bookId: "62951b37e71b6b4556480815" });

    const getOnlyABook = async (dispatch, book) =>{
        // console.log("bookId: " + JSON.stringify(book));
        try{
          const res = await userRequest.get("/books/find/"+ book.bookId, book);
          setBookTitle(res.data.title);
          setBookAuthor(res.data.author);
          setDesc(res.data.desc);
          setImg(res.data.img);
          setGenre(res.data.genre);
          setPrice(res.data.price);
        }catch(err)
        {
          console.log("book not returned");
        }
      }
    
    getOnlyABook(dispatch,{ bookId: localStorage.bookId });
 
    const [isOpen, setIsOpen] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    return (
        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/">Home</Link>
                    <Link to ="/donate">Donate</Link>
                    <Link to="/mycart">My Cart</Link>
                    {(localStorage.userRole === "notSet") && 
                        <Link to="/login">Login</Link>
                    }
                    {(!(localStorage.userRole === "notSet"))&&
                        <Link to="/logout">Logout</Link>
                    }
                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                </div>
            </div>
            <div className={`${isOpen && "hide"}`}>
            <div>
                <div style={{position:'relative', margin:'50px', marginLeft:'450px', marginRight:'450px', backgroundColor:'rgba(255,255,255,0.2)', padding:'40px', borderRadius: '20px'}}>
                            {(localStorage.userRole === "admin") && 
                            <div className='updateProfileIcon'>
                                <div className='tooltip'>Edit</div>
                                <Link to="/editbook"><img src={settings} className="setting-icon"/></Link>
                            </div>
                            }   
                            {(localStorage.userRole === "admin") && 
                            <div className='deleteBtn'>
                                <TiDelete size={32} color="white" onClick={() => {if(localStorage.userRole === "notSet") {setOpenModal3(true)}}}/>
                            </div>
                            }
                            <img src={img} className="profile-pic"/>
                            <h3>{bookTitle}</h3>
                            <p>{bookAuthor}</p>
                            <p className="price">{price} €</p>
                            <div className="profile-bottom">
                                <p>{desc}</p>
                            </div>
                            
                            <Popup3  open3={openModal3}  onClose3={() => setOpenModal3(false)} />
               </div>
               </div>
              
            </div>
            </div>
        </div>
    )
}

export default BookDetails;