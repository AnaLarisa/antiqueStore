import React from 'react';
import './CSS/App.css';
import Login from './Login';
import Registration from './Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Donate from './Donate'
import MyCart from './MyCart'
import Client from './Client';
import AgentSupport from './AgentSupport';
import Service from './Service';
import AddBook from './AddBook';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/donate" element={<Donate/>} />
            <Route path="/mycart" element={<MyCart/>} />
            <Route path="/service" element={<Service/>} />
            <Route path='/client' element={<Client />} />
            <Route path='/agent' element={<AgentSupport />} />
            <Route path='/addbook' element={<AddBook />} />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
