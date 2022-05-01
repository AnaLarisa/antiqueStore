import React, { useState } from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import "./CSS/Navbar.css";
import "./CSS/MyCart.css";
import book from './images/book.png';
import "./CSS/font-awesome-4.7.0/css/font-awesome.min.css";

function MyCart() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/home">Home</Link>
                    <Link to="/donate">Donate</Link>
                    <Link to="/service">Service</Link>
                    <Link to="/login">Login</Link>
                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                </div>
            </div>
            <div className="container">
                <h1></h1>
                <div className="cart">
                    <div className="products">
                        <div className="product">
                            <div className = "image">
                                <img src={book}/>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">Book</h3>
                                <h4 className="product-price">1,000</h4>
                                <p className="product-remove">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                <span className="remove">Remove</span>
                                </p>
                            </div>
                        </div>
                        <div className="product">
                            <div className = "image">
                                <img src={book}/>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">Book 2</h3>
                                <h4 className="product-price">1,000</h4>
                                <p className="product-remove">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                <span className="remove">Remove</span>
                                </p>
                            </div>
                        </div>
                    </div>
                        <div className="cart-total">
                            <p>
                                <span>Total Price</span>
                                <span>3,000</span>
                            </p>
                            <p>
                                <span>Number of Items</span>
                                <span>2</span>
                            </p>
                            <a href="#">Proceed to Checkout</a>
                        
                        </div>
                    </div>
                </div>
        </div>
    </div>


    )
}

export default MyCart;
