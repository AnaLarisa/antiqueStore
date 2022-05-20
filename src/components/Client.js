import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import cometChatMessageButton from './cometChatButton';



function Client(){
  cometChatMessageButton(sessionStorage.userNameuid);

  return (
    <div className="under">
      <div className="over">
      <div className="Navbar">
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
          <span className="nav-logo"><span>ANTIQUE</span><br/>
          <span>STORE</span></span>
          <div className={`nav-items`}>
              <Link to ="/donate">Donate</Link>
              <Link to="/mycart">My Cart</Link>
          </div>
          <div className={`nav-toggle`}>
              <div className="bar"></div>
          </div>
      </div>
          <h1>Client Side</h1>
          <div className="App"></div>
      </div>
    </div>
  );
};
export default Client;