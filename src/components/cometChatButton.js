import React, {Component, useEffect, useState} from 'react';
import MDSpinner from "react-md-spinner";
import {Link} from 'react-router-dom';


const appID = process.env.REACT_APP_ID;
const region = process.env.REACT_APP_REGION;
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const wid = process.env.REACT_APP_W1;


function cometChatMessageButton(uidUser)
{
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    window.CometChatWidget.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then((response) => {
      console.log("Initialization completed successfully");
      //You can now call login function.
      let uid = localStorage.getItem("cc-uid");
      if (uid === null) {
        // create new user 
        // momentan e de test, teoretic daca nu este logat user-ul, acesta nu va fii automat creat
        const uid = uidUser
        const user = new window.CometChatWidget.CometChat.User(uid);
        user.setName(uid);
        window.CometChatWidget.createOrUpdateUser(user).then((user) => {
          // Proceed with user login
          window.CometChatWidget.login({
            uid: uid,
          }).then((loggedInUser) => {
            localStorage.setItem("cc-uid", loggedInUser.uid);
            // Proceed with launching your Chat Widget
            window.CometChatWidget.launch({
              widgetID: wid,
              roundedCorners: "true",
              docked: "true",
              height: "300px",
              width: "400px",
              defaultID: process.env.REACT_APP_AGENT_ID,
              defaultType: "group", //user or group
            });
            setLoad(false);
          });
        });
      } else {
        //login-ul efectiv
        window.CometChatWidget.login({
          uid: uidUser,
        }).then((user) => {
          //launch la widget
          window.CometChatWidget.launch({
            widgetID: wid,
            roundedCorners: "true",
            docked: "true",
            height: "300px",
            width: "400px",
            defaultID: process.env.REACT_APP_AGENT_ID,
            defaultType: "user", //user or group
          });
          setLoad(false);
        });
      }
    });
  }, []);
  //daca nu s a facut conectarea, sa arate cercul ca se incarca
  if (load) {
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
        </div>
        <div className="container">
            <MDSpinner />
        </div>
    </div>
    );
  }
}

export default cometChatMessageButton;