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
import Service from './Service';
import { useSelector } from "react-redux";

import { userRole } from "../redux/apiCalls";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <React.Fragment>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />}  />
            <Route path="/home" element={<Home/>} />
            <Route path="/donate" element={<Donate/>} />
            <Route path="/mycart" element={<MyCart/>} />
            <Route path="/service" element={<Service/>} />
            <Route path='/client' element={<Client />} />
            <Route path='/agent' element={<AgentSupport />} />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
