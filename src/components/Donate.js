import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css'; 
import "./CSS/Navbar.css";
import "./CSS/Donate.css";
import { DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';

function Donate() {
    const [isOpen, setIsOpen] = useState(false);
    const dateValue = new Date();
    const minDate = dateValue;
    const maxDate = new Date((new Date()).setMonth(dateValue.getMonth()+3));
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
                                <div style={{paddingInline:'50px'}}>
                                    <DateTimePickerComponent placeholder="Choose a date and time" value={dateValue} min={minDate} max={maxDate}format="dd-MMM-yyyy HH:mm"></DateTimePickerComponent>
                                </div>
                                <input type = "text" className="donate" placeholder="Full Name"/>
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