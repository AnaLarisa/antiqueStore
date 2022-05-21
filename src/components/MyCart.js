import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import 'react-router-dom'
import {Link} from 'react-router-dom';
import "./CSS/Navbar.css";
import "./CSS/MyCart.css";
import {userRequest} from "../requestMethods";
import book from './images/book.png';
import "./CSS/font-awesome-4.7.0/css/font-awesome.min.css";

//const KEY = process.env.REACT_APP_STRIPE;
const KEY = "pk_test_51JzmyRALRgt5fdLcNrrrBXZ5PdZeC52usIQz2SwgMritEJRGbHZmjs55UMIJvd4IG8uPm6gt7WeImjxWfIeUwAeB00y71hkmwJ";

function MyCart() {
    console.log(KEY);
    const [isOpen, setIsOpen] = useState(false);
    const cart = useSelector((state)=> state.cart );
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try{
                const res = await userRequest.post("/mycart/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                navigate("/success", {
                    stripeData: res.data,
                    recipes: cart, });
            }catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, navigate]);
    
    return (
        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/">Home</Link>
                    <Link to="/donate">Donate</Link>
                    <Link to="/login">Login</Link>
                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                </div>
            </div>
            <div className={`container ${isOpen && "hide"}`}>
                <h1></h1>
                <div className="cart">
                    <div className="products">
                        <div className="product">
                            <div className = "image">
                                <img className = "book" src={book}/>
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
                                <img className = "book" src={book}/>
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
                            <StripeCheckout name="AntiqueStore"
                                            image = "https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id873507500?b=1&k=20&m=873507500&s=170667a&w=0&h=jHslAXdeW5Ob6D9I0zyiLGChrluxKg2S35Z_SHS_Kfc="
                                            billingAddress
                                            shippingAddress
                                            description={`Your total is $${cart.total}`}
                                            amount={cart.total*100}
                                            token={onToken}
                                            stripeKey={KEY}>
                                <div classname = "check"><button className = "checkout">Proceed to Checkout</button></div>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    )
}

export default MyCart;
