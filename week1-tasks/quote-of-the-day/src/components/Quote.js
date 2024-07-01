import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
    const [quote, setQuote] = useState({});
    const [author, setAuthor] = useState('');
    const [authorQuotes, setAuthorQuotes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/quote')
            .then(response => {
                setQuote(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the quote!", error);
            });
    }, []);

    const searchByAuthor = () => {
        axios.get(`http://localhost:3001/api/quotes/${author}`)
            .then(response => {
                setAuthorQuotes(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the quotes by author!", error);
            });
    };

    return (
        <div>
            <h1>Quote of the Day</h1>
            <p>{quote.text} - <em>{quote.author}</em></p>
            <div>
                <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="Search by author" 
                />
                <button onClick={searchByAuthor}>Search</button>
            </div>
            <ul>
                {authorQuotes.map((q, index) => (
                    <li key={index}>{q.text} - <em>{q.author}</em></li>
                ))}
            </ul>
        </div>
    );
};

export default Quote;
