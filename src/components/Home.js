import React, { useState , useEffect} from "react";
import 'react-router-dom'
import {Link} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import {Widget} from 'react-chat-widget';
import './CSS/styles.css'
import './CSS/HomePage.css';
import { AiOutlineSearch } from "react-icons/ai";
import product_card from "./product_data.js"


function Home() {
    const[visible, setVisible] = useState(3);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    };
    useEffect(() =>{
        fetch({Books})
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm,setSearchTerm]=useState("");
    function FilterByCathegory(cathegory) {
        const Filtered = product_card.filter((item) => {
            if(item.cathegory.toLowerCase()==cathegory) {
                return item;
            }
        });
        return Filtered;
    }
    const Books = product_card.filter((item) => {
        if(item.product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        }
    })
    function MapBooks(List) {
        if(!List){List=[];}
        const Filtered = List.map((item) =>
            <div className="card" key={item.id}>
                <div className="card_img">
                    <img src={require('./images/' + item.image +'.png')} />
                </div>
                <div className="card_header">
                    <h2>{item.product_name}</h2>
                    <p className="price">{item.price}<span>{item.currency}</span></p>
                    <div className="btn">Add to cart</div>
                </div>
            </div>
        );
        return Filtered;
    }
    return (
        <div className="under">
            <div className="over">
            <div className="Navbar">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
                <span className="nav-logo"><span>ANTIQUE</span><br/>
                <span>STORE</span></span>
                <div className="wrapper">
                    <AiOutlineSearch
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        width: '14px',
                      }}
                    />
                    <input className="search" placeholder="Search" onChange={(event) => {const { target } = event; setTimeout(() => {setSearchTerm(target.value);}, 500)}}/>
                </div>
                <div className={`nav-items ${isOpen && "open"}`}>
                    <Link to ="/donate">Donate</Link>
                    <Link to="/mycart">My Cart</Link>
                    <Link to="/service">Service</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/client">Client</Link>
                    <Link to="/agent">Agent</Link>
                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                </div>
            </div>
            <div className={`${((isOpen ||searchTerm == "") && "hide" ) || (!isOpen && "homeContent")}`}>
                    {MapBooks(Books)}

                </div>
                <div className={`${((isOpen ||searchTerm != "") && "hide" ) || (!isOpen && "FilteredContent")}`}>
                    <div className = "cathegories">
                        <h1>Drama</h1>
                        {MapBooks(FilterByCathegory("drama"))}
                    </div>
                    <div className = "cathegories">
                        <h1>Romance</h1>
                        {MapBooks(FilterByCathegory("romance"))}
                    </div>
                    <div className = "cathegories">
                        <h1>Fantasy</h1>
                        {MapBooks(FilterByCathegory("fantasy"))}
                    </div>
                    <div className = "cathegories">
                        <h1>Science-Fiction</h1>
                        {MapBooks(FilterByCathegory("sf"))}
                    </div>
                    <div className = "cathegories">
                        <h1>Mystery</h1>
                        {MapBooks(FilterByCathegory("mistery"))}
                    </div>
                </div>
                <div className='App'>
                    <Widget
                        title='My E-commerce Live Chat'
                        subtitle='Ready to help you'
                    />
                </div>
            </div>
        </div>

    )
}

export default Home;