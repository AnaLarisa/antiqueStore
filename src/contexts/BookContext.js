import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

export const BookContext = createContext(undefined);

const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({});
    const [sortType, setSortType] = useState("newest");

    const state = {
        books,
        setBooks,
        filters,
        setFilters,
        sortType,
        setSortType
    };

    console.log('filters', filters);


    useEffect(async () => {
        try {
            const res = await axios.get('http://localhost:2000/books');
            setBooks(res.data);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <BookContext.Provider value={state}>
            {children}
        </BookContext.Provider>
    );
};


const useCategoryContext = () => {
    const context = React.useContext(BookContext);
    if (context === undefined) {
        throw new Error('useBookProvider must be used within a BookProvider');
    }

    return context;
};

export { BookProvider, useCategoryContext };