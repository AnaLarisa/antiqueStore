import React from 'react';
import nft from './CSS/donate.jpg';
import './CSS/popup.css';
import { IoIosCloseCircleOutline} from "react-icons/io";
import {Link} from 'react-router-dom';

const  Popup = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <img src={nft} alt='/' />
        <div className='modalRight'>
          <div className='closeBtn' onClick={onClose}>
          <IoIosCloseCircleOutline size={28} color="#261600" />
          </div>
          <div className='content'>
            <p>You have to be Authenticated if you want to perform this action!</p>

          </div>
          <div className='btnContainer'>
            <button className='btnPrimary'>
            <Link to="/login"><span className='bold'>Login</span></Link>
            </button>
          
            <button className='btnOutline'>
            <Link to="/registration"><span className='bold'>Register</span></Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;