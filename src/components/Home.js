import React from 'react'
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css';

function Home() {
    return (
        <div className="under">
            <div className="over">
                <h1>Hello Welcome!!! </h1>
                <h2><Link className='link' to='/login'>Log in</Link> if you already have an account, or <Link className='link' to='/registration'>register</Link> to get started</h2>
            </div>
        </div>
    )
}

export default Home
