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
import AddBook from './AddBook';
import BookDetails from './BookDetails';

const App = () => {
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
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
