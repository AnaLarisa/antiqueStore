import React, { useState } from "react";
import 'react-router-dom'
import {Link, Navigate} from 'react-router-dom';
import './CSS/Home.css'; 
import "./CSS/Navbar.css";
import "./CSS/Donate.css";
import { DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import cometChatMessageButton from "./cometChatButton";
import { send } from 'emailjs-com';
import emailjs from '@emailjs/browser';


function Donate() {
    const [name, setName] = useState(" ");
    const [nrBook, setNrBook] = useState(" ");
    const [isOpen, setIsOpen] = useState(false);
    const dateValue = new Date();
    const minDate = dateValue;
    const maxDate = new Date((new Date()).setMonth(dateValue.getMonth()+3));
    // console.log("donate " + localStorage.userRole)
    if(localStorage.userRole === "notSet"){
        return <Navigate to="/login"/>
    }
    if(localStorage.userRole === "admin")
    {
        return <Navigate to="/agent"/>
    }

    // const [toSend, setToSend] = useState({
    //     from_name: 'storeantiqueStore@gmail.com',
    //     to_name: localStorage.userEmail,
    //     message: 'test test',
    //     reply_to: '',
    // });

    console.log(localStorage.userEmail);

    var template = {
        user_name: localStorage.username,
        user_email: localStorage.userEmail,
        message: `Name : ${name}, 
             Number of books:  ${nrBook}`
    };

    const handleClick = (e) => {
        e.preventDefault();

        send('service_antiqueStore','template_s1wpoh9',template,'BdViCNIaBzilCPp0o')
            .then(function(res){
                console.log("success !");
            }, function(error){
                console.log("failed .. ");
            });

    };

    cometChatMessageButton(localStorage.userNameuid);
    return (
        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/">Home</Link>
                    <Link to="/mycart">My Cart</Link>
                    {(!(localStorage.userRole === "notSet")) && 
                        <Link to="/login">Login</Link>
                    }
                    {(localStorage.userRole === "notSet")&&
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
                                <input type = "text" className="donate" placeholder="Full Name" onChange={(event) => setName(event.target.value) }/>
                                <input type = "text" className="donate" placeholder="Phone Number"/>
                                <input type = "number" className="donate" placeholder="Number of Books" min = "1" onChange={(event) => setNrBook(event.target.value) }/>
                                <input type = "submit" className="donate" value = "SCHEDULE" onClick={handleClick}/>
                            </form>
                        </div>
                    </div>
                </section>
                <div className='App'>
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default Donate;