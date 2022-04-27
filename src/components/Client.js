import React, {Component, useState} from 'react';
import {Widget, addResponseMessage, addUserMessage, dropMessages} from 'react-chat-widget';
import {CometChat} from '@cometchat-pro/chat';
import {Link} from 'react-router-dom';


import config from '../config';
import 'react-chat-widget/lib/styles.css';

const agentUID = config.agentUID;
const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";
const limit = 30;

class Client extends Component {
  componentDidMount() {
    addResponseMessage('Welcome to our store!');
    addResponseMessage('Are you looking for anything in particular?');
    
    let uid = localStorage.getItem("cc-uid");
    // check for uid, if exist then get auth token, login, create message listener and fetch previous messages
   if ( uid !== null) {
     this.fetchAuthToken(uid).then(
       result => {
         console.log('auth token fetched', result);
         CometChat.login(result.authToken)
         .then( user => {
           console.log("Login successfully:", { user });
           this.createMessageListener();
           this.fetchPreviousMessages();
           
        })
       },
       error => {
         console.log('Initialization failed with error:', error);
       }
     );
   }
  }

  fetchAuthToken = async uid => {
    const response = await fetch(`/api/auth?uid=${uid}`)
    const result = await response.json()
    return result;
  }

  createUser = async () => {
    const response = await fetch(`/api/create`)
    const result = await response.json()
    return result;
  }

  createMessageListener = () => {
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

  fetchPreviousMessages = () => {
    var messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(agentUID)
    .setLimit(limit)
    .build();

    messagesRequest.fetchPrevious().then(
      messages => {
        console.log("Message list fetched:", messages);
        messages.forEach( message => {
          if(message.receiver !== agentUID){
            addResponseMessage(message.text);
          } else {
            addUserMessage(message.text)
          }
        });
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    var textMessage = new CometChat.TextMessage(
      agentUID,
      newMessage,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.USER
    );
    let uid = localStorage.getItem("cc-uid");

    if (uid === null) {
      this.createUser().then(
        result => {
          console.log('auth token fetched', result);
          localStorage.setItem("cc-uid",result.uid)
          CometChat.login(result.authToken)
          .then(user => {
            console.log("Login successfully:", { user });
            CometChat.sendMessage(textMessage).then(
              message => {
                console.log('Message sent successfully:', message);
              },
              error => {
                console.log('Message sending failed with error:', error);
              }
            );
            CometChat.addMessageListener(
              CUSTOMER_MESSAGE_LISTENER_KEY,
              new CometChat.MessageListener({
                onTextMessageReceived: message => {
                  console.log("Incoming Message Log", { message });
                  addResponseMessage(message.text);
                }
              })
            );
          })
      },
      error => {
        console.log('Initialization failed with error:', error);
      })
    } else {
      // we have uid, do send
      CometChat.sendMessage(textMessage).then(
        message => {
          console.log('Message sent successfully:', message);
        },
        error => {
          console.log('Message sending failed with error:', error);
        }
      );
    }
  };

  componentWillUnmount() {
    CometChat.removeMessageListener(CUSTOMER_MESSAGE_LISTENER_KEY);
    CometChat.logout();
    dropMessages();
  }

  render() {
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
            <div className='App'>
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    title='AntiqueStore Support'
                    subtitle='Ready to help you'
                />
            </div>
        </div>
    );
  }
}

export default Client;