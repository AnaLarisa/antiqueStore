import React from 'react';
import { Link } from "react-router-dom";

const Book = ({ item }) => {
    return (
    <div className="card" key={item.id}>
        <div className="card_img">
            <Link to={`/product/${item._id}`}>
                <img src={item.img} />
            </Link>
        </div>
        <div className="card_header">
            <h1>{item.title}</h1>
            <h2>{item.author}</h2>
            <p className="price">{item.price}<span>$</span></p>
            <div className="btn">Add to cart</div>
        </div>
    </div>
    );
};

export default Book;