import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";

function Service() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/home">Home</Link>
                    <Link to="/donate">Donate</Link>
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
                <h1>Service</h1>
            </div>
            </div>
        </div>

    )
}

export default Service;