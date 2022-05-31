import React from 'react';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Donate from './Donate';
import MyCart from './MyCart';
import Login from './Login';
import Registration from './Registration';
import Client from './Client';
import AgentSupport from './AgentSupport';
import AddBook from './AddBook';
import BookDetails from './BookDetails';
import DeleteBook from './DeleteBook';
import EditBook from './EditBook';

import { useSelector } from "react-redux";

import { userRole } from "../redux/apiCalls";
import Logout from './Logout';

// localStorage.setItem('userRole',"notSet");
localStorage.setItem('loginStatus', false);
localStorage.setItem("testReg",false);
localStorage.setItem('testIT',false);


const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <React.Fragment>
        <div className="App">
          <Routes>
            <Route path="/" element={<Client/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/donate" element={<Donate/>} />
            <Route path="/mycart" element={<MyCart/>} />
            <Route path='/agent' element={<AgentSupport />} />
            <Route path='/addbook' element={<AddBook />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/bookdetails" element={<BookDetails/>} />
            <Route path='/deletebook' element={<DeleteBook />} />
            <Route path='/editbook' element={<EditBook /> } />
            <Route path='/logout' element={<Logout /> } />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
