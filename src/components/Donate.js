import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css'; 
import "./CSS/Navbar.css";
import "./CSS/Donate.css";

function Donate() {
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
                    <Link to="/mycart">My Cart</Link>
                    <Link to="/service">Service</Link>
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
                <section class = "banner">
                    <h2>SCHEDULE THE DONATION</h2>
                    <div class = "card-container">
                        <div class = "card-img">
                        </div>

                        <div class = "card-content">
                            <h3>Schedule</h3>
                            <form>
                                    <select name = "days" className="donate">
                                        <option value = "day-select">Select Day</option>
                                        <option value = "sunday">Sunday</option>
                                        <option value = "monday">Monday</option>
                                        <option value = "tuesday">Tuesday</option>
                                        <option value = "wednesday">Wednesday</option>
                                        <option value = "thursday">Thursday</option>
                                        <option value = "friday">Friday</option>
                                        <option value = "saturday">Saturday</option>
                                    </select>

                                    <select name = "hours" className="donate">
                                        <option value = "hour-select">Select Hour</option>
                                        <option value = "10">10: 00</option>
                                        <option value = "10">12: 00</option>
                                        <option value = "10">14: 00</option>
                                        <option value = "10">16: 00</option>
                                        <option value = "10">18: 00</option>
                                        <option value = "10">20: 00</option>
                                        <option value = "10">22: 00</option>
                                    </select>
                                    <input type = "text" className="donate" placeholder="Phone Number"/>
                                    <input type = "number" className="donate" placeholder="Number of Books" min = "1"/>
                                    <input type = "submit" className="donate" value = "SCHEDULE"/>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            </div>
        </div>
    )
}

export default Donate;