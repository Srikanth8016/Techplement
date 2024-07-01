const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const quoteSchema = new mongoose.Schema({
    author: String,
    text: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

app.get('/api/quote', async (req, res) => {
    const quotes = await Quote.find();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
});

app.get('/api/quotes/:author', async (req, res) => {
    const author = req.params.author;
    const quotes = await Quote.find({ author: new RegExp(author, 'i') });
    res.json(quotes);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
