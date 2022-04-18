import React from 'react';
import './CSS/App.css';
import Login from './Login';
import Registration from './Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Client from './Client';
import Agent from './Agent';

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
            <Route path='/client' component={Client} />
            <Route path='/agent' component={Agent} />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
