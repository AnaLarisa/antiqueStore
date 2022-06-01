import React, {useEffect, useState, useRef} from 'react'
import "./CSS/AddBook.css";
import UploadPic from "./UploadPic";
import Tilt from 'react-vanilla-tilt'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import './CSS/Home.css';
import "./CSS/Navbar.css";
import { addBook, deleteBook } from "../redux/apiCalls";
import { useDispatch , useSelector} from "react-redux";
import { publicRequest, userRequest } from "../requestMethods";
import axios from 'axios';
import ScrollToTop from "./ScrollToTop";
import { AiOutlineSearch } from "react-icons/ai";


function AdminBooks() {
    const navigate = useNavigate();

    // if(localStorage.userRole === "notSet"){
    //     return <Navigate to="/login"/>
    // }
    // if(localStorage.userRole === "user")
    // {
    //     return <Navigate to="/"/>
    // }


    const[product, setProduct] = useState([]);

    const { isFetching, error } = useSelector((state) => state.user);

    // DELETE BOOK

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


    function seeDetails(item){
        localStorage.setItem('bookId',item);
        navigate('/bookdetails');
    }
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
                    <button className="loadMoreBtn"  type="submit" >Edit Book</button>
                </div>
            </div>
        );
        return Filtered;
    }

    // \deleteBook(dispatch, { token: localStorage.acessToken, isAdmin:true, title: "BogdanTest30May", author: "test Bogdan", price: "555", desc: "test Bogdan", genre: "fantasy", img: "test", _id: "62950646e92978aaf94c0f1f"})

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
                <Link to ="/addbook">Add Book</Link>
                <Link to ="/agent">Support</Link>
                <Link to="/editbook">Edit Book</Link>
                <Link to="/logout">Logout</Link>
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
}

export default AdminBooks;

