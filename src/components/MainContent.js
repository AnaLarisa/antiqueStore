import React, {useEffect, useState} from 'react';
import { useDispatch , useSelector} from "react-redux";
import axios from "axios";
import Book from "./Book";
import { getBooks } from "../redux/apiCalls";
import {useCategoryContext, BookProvider} from "../contexts/BookContext";

const MainContent = () => {
    const { books, filters, sortType } = useCategoryContext();
    const dispatch = useDispatch();
    getBooks(dispatch);


    const getSortFunction = () => {
        switch (sortType) {
            case 'newest':
                return (a, b) => a.createdAt - b.createdAt
            case 'asc':
                return (a, b) => a.title.localeCompare(b.title)
            case 'desc':
                return (a, b) => b.title.localeCompare(a.title)
            default:
                return () => true
        }
    }

    const filteredBooks = Object.entries(filters).reduce((acc, [key, value]) => {
        return books.filter(item => item[key] === value);
    }, books).sort(getSortFunction());

    return (
            <div className="main_content">
                {filteredBooks
                    .map((item) => <Book item={item} key={item.id} />)}
            </div>
    );
};

export default MainContent;