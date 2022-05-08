import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import {Widget} from 'react-chat-widget';
import './CSS/styles.css'
import MainContent from "./MainContent.js";
import './CSS/HomePage.css';
import {useCategoryContext, BookProvider} from "../contexts/BookContext";

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    return (

        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/donate">Donate</Link>
                    <Link to="/mycart">My Cart</Link>
                    <Link to="/service">Service</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/client">Client</Link>
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
                <BookProvider>
                    <MainContent />
                </BookProvider>
                </div>
                <div className='App'>
                    <Widget
                        title='My E-commerce Live Chat'
                        subtitle='Ready to help you'
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;