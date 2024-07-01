
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Quote Schema and Model
const quoteSchema = new mongoose.Schema({
    author: String,
    text: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

// Seed quotes data
const quotes = [
    { author: "Alan Kay", text: "The best way to predict the future is to invent it." },
    { author: "Charles R. Swindoll", text: "Life is 10% what happens to us and 90% how we react to it." },
    { author: "Steve Jobs", text: "The only way to do great work is to love what you do." },
    { author: "Dalai Lama", text: "The purpose of our lives is to be happy." },
    { author: "Stephen King", text: "Get busy living or get busy dying." },
];

Quote.insertMany(quotes)
    .then(() => {
        console.log("Quotes seeded!");
        mongoose.connection.close();
    })
    .catch(err => {
        console.error("Seeding error:", err);
    });
