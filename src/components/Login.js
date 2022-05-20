import React, {useState} from 'react'
import Registration from './Registration';
import {Link} from 'react-router-dom';
import email from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import "./CSS/Authentification.css";


function Login() {

    const [emaillog, setEmaillog] = useState(" ");
    const [passwordlog, setPasswordlog] = useState(" ");
    // const dispatch = useDispatch();
    // const { isFetching, error } = useSelector((state) => state.user);
    //
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     login(dispatch, { username, password });
    // };

    return (
        <form>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div className='imgs'>
                            <div className='container-image'>
                                <img src={profile} alt='profile' className='profile'/>
                            </div>
                        </div>
                        <div>
                            <h1 className='LHeader'>Login</h1>
                            <div>
                                <img src={email} alt="emial" className='email' />
                                <input type="email" placeholder='Enter Email-address' className='fill' onChange={(event) => setEmaillog(event.target.value) }/>
                            </div>
                            <div className='second-input'>
                                <img src={lock} alt='password' className='email' />
                                <input type="password" placeholder='Enter Password' className='fill' onChange={(event) => setPasswordlog(event.target.value) }/>
                            </div>
                            {/* HERE WITH THE HELP OF LINK PROVIDED BY REACT-ROUTER WE CAN NAVIGATE TO OTHER PAGES 
                                IN LINK WE HAVE TO PASS LOCATION OF THE NAVIGATING PAGE AS PATH IS DEFINED IN THE APP.JS*/}
                            <div className='login-btn'>
                                <button className='login-btn' type="submit">Login</button>
                            </div>
                            <div className='reg-link'>
                                <p>Don't have an account? <Link className='link' to='/registration'>Register Now</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login

