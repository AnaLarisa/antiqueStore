import React, {useState, useEffect} from 'react'
import { useDispatch , useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import { register } from "../redux/apiCalls";
import mail from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import './CSS/App.css';


function Registration() {

    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const [modal, setModal] = useState(false);

    const [username, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);


    const handleSubmit = (e) =>{
        e.preventDefault()

        if (!username || !email || !password) {
            alert("Complete all the fields!!!")
            return
        }
        console.log(username);

        register(dispatch, {username:username, email:email, password:password});
        //if(e.value!=null) // nu stiu ce conditie sa spun aici ca sa verifice daca e okay logarea (daca returneaza ceva serverul nostru)
        setModal(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div>
                            <div>
                                {modal &&
                                    <div className="modalContainer">
                                        <div className="title">
                                            <h1>Account created!</h1>
                                            <p>Go back to login</p>
                                        </div>
                                        <div className="footer">
                                            <Link to ='/login'>
                                                <button
                                                    onClick={() => {
                                                        setModal(false);
                                                    }}
                                                >
                                                    Login
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                }
                            </div>
                            {!modal &&
                            <div>
                                <h1 className='RHeader'>Registration</h1>
                                <div>
                                    <img src={profile} alt="email" className='email' />
                                    <input type="text" placeholder='Enter Name' className='fill' id="username" name="username" onChange={(event) => setName(event.target.value) }/>
                                </div>
                                <div className='mail-id'>
                                    <img src={mail} alt="email" className='email' />
                                    <input type="email" placeholder='Enter Email-address' className='fill' id="email" name="email" onChange={(event) => setEmail(event.target.value) }/>
                                </div>
                                <div className='mail-id'>
                                    <img src={lock} alt="password" className='email' />
                                    <input type="password" placeholder='Enter Password' className='fill' id="password" name="password" onChange={(event) => setPassword(event.target.value) }/>
                                </div>
                                <div className='login-btn'>
                                    <button className='login-btn' type="submit">Register</button>
                                </div>
                                <div className='reg-link'>
                                    <p>If Account exist then <Link className='link' to='/login'>Login!!!</Link></p>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Registration
