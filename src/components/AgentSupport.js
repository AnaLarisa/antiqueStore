import React, {Component, useEffect, useState} from 'react';

import MDSpinner from "react-md-spinner";
import { Link, Navigate } from 'react-router-dom';

const agentUID = process.env.REACT_APP_AGENT_ID;
const appID = process.env.REACT_APP_ID;
const region = process.env.REACT_APP_REGION;
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const wid = process.env.REACT_APP_W2;

function AgentSupport(){
  if(localStorage.userRole === "notSet"){
        return <Navigate to="/login"/>
    }
    if(localStorage.userRole === "user")
    {
        return <Navigate to="/home"/>
    }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.CometChatWidget.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then(
      (response) => {
        console.log("Initialization completed successfully");
        //You can now call login function.
        window.CometChatWidget.login({
          uid: agentUID,
        }).then(
          (response) => {
            window.CometChatWidget.launch({
              widgetID: wid,
              docked: "false",
              target: "#cometchat",
              roundedCorners: "true",
              height: "600px",
              width: "100%",
              defaultID: "", //default UID (user) or GUID (group) to show,
              defaultType: "user", //user or group
            });
            setLoading(false);
          },
          (error) => {
            console.log("User login failed with error:", error);
            //Check the reason for error and take appropriate action.
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take appropriate action.
      }
    );
  }, []);
  if (loading) {
    return (
      <div>
        <MDSpinner />
      </div>
    );
  }
  return (
      <div className="under">
        <div className="over">
        <div className="Navbar">
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
            <span className="nav-logo"><span>ANTIQUE</span><br/>
            <span>STORE</span></span>
            <div className={`nav-items`}>
                <Link to ="/addbook">Add Book</Link>
                <Link to="/mycart">My Cart</Link>
            </div>
            <div className={`nav-toggle`}>
                <div className="bar"></div>
            </div>
        </div>
            <p></p>
            <div id="cometchat" style={{ margin: "0 auto", width: "60%" }}></div>
        </div>
      </div>
  );
};
export default AgentSupport;   