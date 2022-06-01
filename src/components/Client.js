import React, {Component, useEffect, useState, useRef} from 'react';
import MDSpinner from "react-md-spinner";
import 'react-router-dom'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import './CSS/styles.css'
import './CSS/HomePage.css';
import { AiOutlineSearch } from "react-icons/ai";
import product_card from "./product_data.js"
import ScrollToTop from "./ScrollToTop";

import {getBooks, addCart} from '../redux/apiCalls';

import { useDispatch , useSelector} from "react-redux";
import axios from 'axios';


const appID = process.env.REACT_APP_ID;
const region = process.env.REACT_APP_REGION;
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const wid = process.env.REACT_APP_W1;

function Client(){
  // window.location.reload();
  const navigate = useNavigate();
    
  const[detaliu,setDetaliu] = useState([]);
  const dispatch = useDispatch();
  // const rez = getBooks(dispatch);

  // console.log("get books " + JSON.stringify(rez));

  if(localStorage.userRole === "admin")
  {
      return <Navigate to="/agent"/>
  }

  function setId(item){
    addCart(dispatch,{token: localStorage.acessToken, userId:localStorage._id, books :[ { bookId:item, quantity:1 } ] })
    
    console.log("Acesta este un detaliu : " + item);
  };

  function seeDetails(item){
    localStorage.setItem('bookId',item);
    navigate('/bookdetails');
  }


  // test de sters : 


  //fetch
  const[product, setProduct] = useState([]);
  

  useEffect( () =>{
      getData();
  }, [])

  async function getData() {
      await axios('http://localhost:2000/books')
          .then(response => {
              setProduct(response.data);
          })
          .catch(err =>{
              console.log('error fetching');
          })
  }

  console.log(product);

  const[items, setItems] =useState([]);
    const[visible, setVisible] = useState(3);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    };
    useEffect(() =>{
        fetch({Books})
        .then((res) =>res.json())
        .then((data) => setItems(data));
    }, []);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
          top: elementRef.current.offsetTop,
          behavior: "smooth",
        });
      };
      const drama = useRef(null);
      const romance = useRef(null);
      const fantasy = useRef(null); 
      const fiction = useRef(null);
      const mistery = useRef(null); 

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm,setSearchTerm]=useState("");
    function FilterByCategory(genre) {
        const Filtered = product.filter((item) => {
            if(item.genre.toLowerCase()==genre) {
                return item;
            }
        });
        return Filtered;
    }
    const Books = product.filter((item) => {
        if(item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        }
    })
    function MapBooks(List) {
        if(!List){List=[];}
        const Filtered = List.slice(0, visible).map((item) =>
            <div className="card" key={item._id}>
                <button className="imgButton" type="submit" onClick={() => seeDetails(item._id)}>
                    <div className="card_img">
                        <img src={item.img} />
                    </div>
                </button>
                <div className="card_header">
                    <h2>{item.title}</h2>
                    <p className="price">{item.price}<span>{item.currency}</span></p>
                    <button className="loadMoreBtn"  type="submit" onClick={() => setId(item._id)}>Add to cart</button>
                </div>
            </div>
        );
        return Filtered;
    }

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
        let uid = localStorage.userNameuid;
        if (uid === null) {
          // create new user 
          // momentan e de test, teoretic daca nu este logat user-ul, acesta nu va fii automat creat
          const uid = localStorage.userNameuid;
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
            uid: localStorage.userNameuid,
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
        <div className="under" style ={{height:"3375px"}}>
        <div className="over">
        <div className="Navbar">
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
          <span className="nav-logo"><span>ANTIQUE</span><br/>
          <span>STORE</span></span>
          <div className="wrapper">
            <AiOutlineSearch
            style={{
                position: 'absolute',
                top: '5px',
                left: '8px',
                width: '14px',
              }}
            />
            <input className="search" placeholder="Search" onChange={(event) => {const { target } = event; setTimeout(() => {setSearchTerm(target.value);}, 500)}}/>
          </div>
          <div className={`nav-items ${isOpen && "open"}`}>
              <Link to ="/donate">Donate</Link>
              <Link to="/mycart">My Cart</Link>
              {(localStorage.userRole === "notSet") && 
                  <Link to="/login">Login</Link>
              }
              {(!(localStorage.userRole === "notSet"))&&
                  <Link to="/logout">Logout</Link>
              }
          </div>
          <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="bar"></div>
          </div>
        </div>
        <div className={`${((isOpen ||searchTerm == "") && "hide" ) || (!isOpen && "homeContent")}`}>
          {MapBooks(Books)}
          <div className={`${(Books.length!=0)?"loadMore":"hide"}`}>
            <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
          </div>
        </div>
          <div className={`${((isOpen ||searchTerm != "") && "hide" ) || (!isOpen && "filteredContent")}`} >
          <ScrollToTop />
          <div className="hero">
              <ul>
              <li onClick={() => scrollToSection(drama)} className="link">
                  Drama
              </li>
              <li onClick={() => scrollToSection(romance)} className="link">
                  Romance
              </li>
              <li onClick={() => scrollToSection(fantasy)} className="link">
                  Fantasy
              </li>
              <li onClick={() => scrollToSection(fiction)} className="link">
                  Science Fiction
              </li>
              <li onClick={() => scrollToSection(mistery)} className="link">
                  Mistery
              </li>
              </ul>
          </div>
            <div ref={drama} className = "categories">
                <p className="text">Drama</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("drama"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>   
            </div>

            <div ref={romance} className = "categories">
                <p className="text">Romance</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("romance"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>

            <div ref={fantasy} className = "categories">
                <p className="text">Fantasy</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("fantasy"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>

            <div ref={fiction} className = "categories">
                <p className="text">Science-Fiction</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("fiction"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>

            <div ref={mistery} className = "categories">
                <p className="text">Mistery</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("mistery"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="container">
            <MDSpinner />
        </div>
    </div>
    );
  }
  //altfel, sa arate docked ul nostru
  return (
    <div className="under" style ={{height:"3375px"}}>
        <div className="over">
        <div className="Navbar">
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Irish+Grover" />
          <span className="nav-logo"><span>ANTIQUE</span><br/>
          <span>STORE</span></span>
          <div className="wrapper">
            <AiOutlineSearch
            style={{
                position: 'absolute',
                top: '5px',
                left: '8px',
                width: '14px',
              }}
            />
            <input className="search" placeholder="Search" onChange={(event) => {const { target } = event; setTimeout(() => {setSearchTerm(target.value);}, 500)}}/>
          </div>
          <div className={`nav-items ${isOpen && "open"}`}>
              <Link to ="/donate">Donate</Link>
              <Link to="/mycart">My Cart</Link>
              {(localStorage.userRole === "notSet") && 
                  <Link to="/login">Login</Link>
              }
              {(!(localStorage.userRole === "notSet"))&&
                  <Link to="/logout">Logout</Link>
              }
          </div>
          <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="bar"></div>
          </div>
        </div>
        <div className={`${((isOpen ||searchTerm == "") && "hide" ) || (!isOpen && "homeContent")}`}>
          {MapBooks(Books)}
          <div className={`${(Books.length!=0)?"loadMore":"hide"}`}>
            <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
          </div>
        </div>
          <div className={`${((isOpen ||searchTerm != "") && "hide" ) || (!isOpen && "filteredContent")}`} >
          <ScrollToTop />
          <div className="hero">
              <ul>
              <li onClick={() => scrollToSection(drama)} className="link">
                  Drama
              </li>
              <li onClick={() => scrollToSection(romance)} className="link">
                  Romance
              </li>
              <li onClick={() => scrollToSection(fantasy)} className="link">
                  Fantasy
              </li>
              <li onClick={() => scrollToSection(fiction)} className="link">
                  Science Fiction
              </li>
              <li onClick={() => scrollToSection(mistery)} className="link">
                  Mistery
              </li>
              </ul>
          </div>
            <div ref={drama} className = "categories">
                <p className="text">Drama</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("drama"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>   
            </div>

            <div ref={romance} className = "categories">
                <p className="text">Romance</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("romance"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>

            <div ref={fantasy} className = "categories">
                <p className="text">Fantasy</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("fantasy"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>

            <div ref={fiction} className = "categories">
                <p className="text">Science-Fiction</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("fiction"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>

            <div ref={mistery} className = "categories">
                <p className="text">Mistery</p>
                <div className="homeContent">
                    {MapBooks(FilterByCategory("mistery"))}
                    <div className="loadMore">
                        <button className="loadMoreBtn" onClick={showMoreItems}>Load More</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default Client;