import React, {useState, useEffect} from 'react'
import Login from './Login';
import {Link} from 'react-router-dom';
import mail from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import './CSS/App.css';


function Registration() {
    
    const LOCAL_STORAGE_KEY = "Info";

    const [Info, setInfo] = useState({
        name:"",
        email:"",
        password:"",
        profession:""
    });

    useEffect(() => {
        const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
        if (retriveContacts) setInfo(retriveContacts);
    }, [])

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Info))
    },[Info])

    let register = (e: { preventDefault: () => void; }) =>{
        e.preventDefault()

        if (!Info.name || !Info.email || !Info.password || !Info.profession) {
            alert("Complete all the fields!!!")
            return
        }
    }

    return (
        <form onSubmit={register}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div>
                            <h1 className='RHeader'>Registration</h1>
                            <div>
                                <img src={profile} alt="emial" className='email' />
                                <input type="text" placeholder='Enter Name' className='fill' value={Info.name} onChange={(e) => setInfo({...Info, name: e.target.value})}/>
                            </div>
                            <div className='mail-id'>
                                <img src={mail} alt="email" className='email' />
                                <input type="email" placeholder='Enter Email-address' className='fill' value={Info.email} onChange={(e) => setInfo({...Info, email: e.target.value})}/>
                            </div>
                            <div className='mail-id'>
                                <img src={lock} alt="password" className='email' />
                                <input type="password" placeholder='Enter Password' className='fill' value={Info.password} onChange={(e) => setInfo({...Info, password: e.target.value})}/>
                            </div>
                            <div className='login-btn'>
                                <button type="submit">Register</button>
                            </div>
                            <div className='reg-link'>
                                <p>If Account exist then <Link className='link' to='/login'>Login!!!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Registration