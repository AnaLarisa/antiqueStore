import React, {useState} from 'react'
import "./CSS/AddBook.css";
import UploadPic from "./UploadPic";
import Tilt from 'react-vanilla-tilt'
import {Link} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";

function AddBook() {

    const [isOpen, setIsOpen] = useState(false);
    const [namelog, setNamelog] = useState(" ");
    const [authorlog, setAuthorlog] = useState(" ");
    const [pricelog, setPricelog] = useState(" ");
    const [cathegorylog, setCathegorylog] = useState(" ");
    const [descriptionlog, setDescriptionlog] = useState("default");

    return (
        <div className="under">
        <div className="over">
        <div className="Navbar">
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
            <span className="nav-logo"><span>ANTIQUE</span><br/>
            <span>STORE</span></span>
            <div className={`nav-items ${isOpen && "open"}`}>
                <Link to="/agent">Agent</Link>
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
            <Tilt className='sub-main-addbook' style={{backgroundcolor:"transparent", padding:'50px'}}>
                    <div className="upload_pic">
                        <UploadPic/>
                        <div className='bt'>
                            <button type="submit" className='btbt'>Add Book</button>
                        </div>
                    </div>
                    <div>
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
            </Tilt>
            </div>
        </form>
        </div>
    </div>
</div>
       
    )
}

export default AddBook
