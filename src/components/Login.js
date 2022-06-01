import React, {useState} from 'react';
import { useDispatch , useSelector} from "react-redux";
import { login } from "../redux/apiCalls";
import Registration from './Registration';
import {Link} from 'react-router-dom';
import email from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import "./CSS/Authentification.css";
import {Popup4} from './Popup';


function Login() {
    const [emaillog, setEmaillog] = useState(" ");
    const [passwordlog, setPasswordlog] = useState(" ");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const [modal, setModal] = useState(false);
    
    console.log(localStorage.testIT);
    const [openModal4, setOpenModal4] = useState(false);



    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email: emaillog, password: passwordlog })
        if(localStorage.loginStatus === "true"){
            setModal(true);
        }else{
            login(dispatch, { email: emaillog, password: passwordlog })
            if(localStorage.loginStatus === "true"){
                setModal(true);
            }
            else{
                setOpenModal4(true);
            }
        }
    };


    return (
        <form>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div>
                            {modal &&
                            <div  /*className="modalBackground"*/>
                                <div className="modalContainer">
                                    <div className="title">
                                        <h1>Login successful!</h1>
                                        <p>Go back to homepage</p>
                                    </div>
                                    <div className="footer">
                                        <Link to ='/'>
                                            <button
                                                onClick={() => {
                                                    setModal(false);
                                                }}
                                            >
                                                Continue
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        <div className='imgs'>
                            <div className='container-image'>
                                <img src={profile} alt='profile' className='profile'/>
                            </div>
                        </div>
                        <Popup4  open4={openModal4}  onClose4={() => setOpenModal4(false)} />
                        <div>
                            <h1 className='LHeader'>Login</h1>
                            <div>
                            <div className='imgs'>
                                <div className='container-image'>
                                    <img src={profile} alt='profile' className='profile'/>
                                </div>
                            </div>
                            <div>
                                <h1 className='LHeader'>Login</h1>
                                <div>
                                    <img src={email} alt="email" className='email' />
                                    <input type="email" placeholder='Enter Email-address' className='fill' onChange={(event) => setEmaillog(event.target.value) }/>
                                </div>
                                <div className='second-input'>
                                    <img src={lock} alt='password' className='email' />
                                    <input type="password" placeholder='Enter Password' className='fill' onChange={(event) => setPasswordlog(event.target.value) }/>
                                </div>
                                {/* HERE WITH THE HELP OF LINK PROVIDED BY REACT-ROUTER WE CAN NAVIGATE TO OTHER PAGES 
                                    IN LINK WE HAVE TO PASS LOCATION OF THE NAVIGATING PAGE AS PATH IS DEFINED IN THE APP.JS*/}
                                <div className='login-btn'>
                                    <button className='login-btn' type="submit" onClick={handleClick}>Login</button>
                                </div>
                                <div className='reg-link'>
                                    <p>Don't have an account? <Link className='link' to='/registration'>Register Now</Link></p>
                                </div>
                                </div>
                                
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );

}

export default Login