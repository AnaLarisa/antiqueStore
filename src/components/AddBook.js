import React, {useState} from 'react'
import "./CSS/AddBook.css";
import UploadPic from "./UploadPic";
import {Link, Navigate} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import { addBook } from "../redux/apiCalls";
import { useDispatch , useSelector} from "react-redux";


function AddBook() {

    if(localStorage.userRole === "notSet"){
        return <Navigate to="/login"/>
    }
    if(localStorage.userRole === "user")
    {
        return <Navigate to="/"/>
    }

    const [isOpen, setIsOpen] = useState(false);
    const [namelog, setNamelog] = useState(" ");
    const [authorlog, setAuthorlog] = useState(" ");
    const [pricelog, setPricelog] = useState(" ");
    const [cathegorylog, setCathegorylog] = useState(" ");
    const [descriptionlog, setDescriptionlog] = useState("default");


    const { isFetching, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleClick = (e) =>{

        e.preventDefault();

        addBook(dispatch, { token: localStorage.acessToken, isAdmin:true, title: namelog, author: authorlog, price: pricelog, desc: descriptionlog, genre: cathegorylog })

    };

    return (
        <div className="under">
        <div className="over">
        <div className="Navbar">
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
            <span className="nav-logo"><span>ANTIQUE</span><br/>
            <span>STORE</span></span>
            <div className={`nav-items ${isOpen && "open"}`}>
                <Link to="/agent">Support</Link>
                <Link to="/adminbooks">All books</Link>
                <Link to="/logout">Logout</Link>
            </div>
            <div
                className={`nav-toggle ${isOpen && "open"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bar"></div>
            </div>
        </div>
        <div className={`${isOpen && "hide"}`}>
        <form>
            <div className='main-addbook'>
            <div className='sub-main-addbook' style={{backgroundcolor:"transparent", padding:'50px'}}>
                    <div className="upload_pic">
                        <div className='bt'>
                            <button type="submit" className='btbt' onClick={handleClick}>Add Book</button>
                        </div>
                    </div>
                    <div className='inputs'>
                            <br></br>
                            <div>
                                <input placeholder='Name' className='fill' onChange={(event) => setNamelog(event.target.value) }/> 
                            </div>
                            <div className='second-input'>
                                <input placeholder='Author' className='fill' onChange={(event) => setAuthorlog(event.target.value) }/>
                            </div>
                            <div className='second-input'>
                                <input type="number" placeholder='Price' min={0} className='fill' onChange={(event) => setPricelog(event.target.value) }/>
                            </div>
                            <div lassName="drop-down-menu">
                                <label>
                                    <div className="b"></div>
                                    <select defaultValue={descriptionlog} onChange={(event) => setCathegorylog(event.target.value) }> 
                                        <option value="default" disabled hidden>Cathegory</option>
                                        <option value="drama">Drama</option>
                                        <option value="romance">Romance</option>
                                        <option value="fantasy">Fantasy</option>
                                        <option value="sf">Science-Fiction</option>
                                        <option value="mistery">Mistery</option>
                                    </select>
                                </label>
                            </div>
                            <div className='second-input'>
                                <textarea placeholder='Description' className='fill' onChange={(event) => setDescriptionlog(event.target.value) }/>
                            </div>
                        </div>
            </div>
            </div>
        </form>
        </div>
    </div>
</div>
       
    )
}

export default AddBook

