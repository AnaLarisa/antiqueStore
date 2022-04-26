import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import {Link} from 'react-router-dom';
import {CometChat} from '@cometchat-pro/chat';

const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";

export const fetchAuthToken= async uid =>{
    const response = await fetch(`/api/auth?uid=${uid}`)
    const result = await response.json()
    return result;
}

export const createMessageListener = () => {
    CometChat.addMessageListener(
        CUSTOMER_MESSAGE_LISTENER_KEY,
        new CometChat.MessageListener({
          onTextMessageReceived: message => {
            console.log("Incoming Message Log", { message });
            addResponseMessage(message.text);
          }
        })
    );
}

function Client() {
    useEffect(() => {
        addResponseMessage('Welcome to our store!');
        addResponseMessage('Are you looking for anything in particular?');
    }, []);


    let uid = localStorage.getItem("cc-uid");
    if ( uid !== null) {
        fetchAuthToken(uid).then(
          result => {
            console.log('auth token fetched', result);
            CometChat.login(result.authToken)
            .then( user => {
              console.log("Login successfully:", { user });
              createMessageListener();              
           })
          },
          error => {
            console.log('Initialization failed with error:', error);
          }
        );
    }

    

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
    };
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/donate">Donate</Link>
                    <Link to="/mycart">My Cart</Link>
                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                </div>
            </div>
                <h1>Client Side</h1>
            </div>
            <div className='App'>
                <Widget
                    handleNewUserMessage={handleNewUserMessage}
                    title='AntiqueStore Support'
                    subtitle='Ready to help you'
                />
            </div>
        </div>
    );
}

export default Client;