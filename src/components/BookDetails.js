import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css'; 
import "./CSS/Navbar.css";
import "./CSS/BookDetails.css";
import Tilt from 'react-vanilla-tilt';
import profile from "./images/1.png"
import settings from "./images/setting.png"
import { TiDelete } from "react-icons/ti";

function BookDetails() {
    const [isOpen, setIsOpen] = useState(false);
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
                    <Link to="/login">Login</Link>
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
                <Tilt style={{position:'relative', margin:'50px', marginLeft:'450px', marginRight:'450px', backgroundColor:'rgba(255,255,255,0.2)', padding:'40px', borderRadius: '20px'}}>
                            <div className='updateProfileIcon'>
                                <div className='tooltip'>Edit</div>
                                <Link to="/addbook"><img src={settings} className="setting-icon"/></Link>
                            </div>
                            <div className='deleteBtn'>
                                <Link to="/"><TiDelete size={32} color="white" /></Link>
                            </div>
                            <img src={profile} className="profile-pic"/>
                            <h3>Then She Was Gone</h3>
                            <p>Lisa Jewell</p>
                            <p className="price">20 €</p>
                            <div className="profile-bottom">
                                <p>A 2018 Goodreads Choice Award Finalist--Top 5 Best Mystery & Thriller * A Suspense Magazine "Best of 2018" Thriller/Suspense Pick
                                    "An acutely observed family drama with bone-chilling suspense." --People</p>
                            </div>
               </Tilt>
               </div>
            </div>
            </div>
        </div>
    )
}

export default BookDetails;