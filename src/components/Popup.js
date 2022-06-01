import React from 'react';
import nft from './CSS/donate2.jpg';
import './CSS/popup.css';
import { IoIosCloseCircleOutline} from "react-icons/io";
import {Link, Navigate} from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";


export const  Popup = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainerPopup'
      >
        <img src={nft} alt='/' className='imgpopup'/>
        <div className='modalRight'>
          <div className='closeBtn' onClick={onClose}>
          <IoIosCloseCircleOutline size={28} color="#261600" />
          </div>
          <div className='content'>
            <p>You have to be Authenticated if you want to perform this action!</p>

          </div>
          <div className='btnContainer'>
            <button className='btnPopup'>
            <Link to="/login" style={{ textDecoration: 'none'}}><span className='bold'>Login</span></Link>
            </button>
          
            <button className='btnPopup'>
            <Link to="/registration" style={{ textDecoration: 'none'}}><span className='bold'>Register</span></Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export const  Popup2 = ({ open2, onClose2 }) => {
  if (!open2) return null;
  return (
    <div onClick={onClose2} >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainerPopup'
      >
        <img src={nft} alt='/' className='imgpopup'/>
        <div className='modalRight'>
          <div className='closeBtn' onClick={onClose2}>
          <IoIosCloseCircleOutline size={28} color="#261600" />
          </div>
          <div className='content'>
            <p>If the operation is successful you will receive a confirmation email.</p>

          </div>
        </div>
      </div>
    </div>
  );
};


export const  Popup3 = ({ open3, onClose3 }) => {
  const dispatch = useDispatch();

  function deleteBook()
  {

    deleteBook(dispatch, { token: localStorage.acessToken, isAdmin:true, _id: localStorage.bookId })

    return <Navigate to="/adminbooks"/>
  }

  if (!open3) return null;
  return (
    <div onClick={onClose3} >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainerPopup'
      >
        <img src={nft} alt='/' className='imgpopup'/>
        <div className='modalRight'>
          <div className='closeBtn' onClick={onClose3}>
          <IoIosCloseCircleOutline size={28} color="#261600" />
          </div>
          <div className='content'>
            <p>Are you sure you want to delete this book?</p>
          </div>
          <div className='btnContainer'>
            <button onClick={deleteBook()} className='btnPopup'>
            <span className='bold'>Yes</span>
            </button>
          
            <button className='btnPopup'>
            <div onClick={onClose3}><span className='bold'>No</span></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
